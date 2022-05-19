const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, User, Comment, RSVP_Interested, RSVP_Yes, } = require('../../models');
const withAuth = require('../../utils/auth');

// get all events
router.get('/', (req, res) => {
    console.log('============================');
    Event.findAll({
        attributes: [
            'id',
            'event_name',
            'event_description',
            'event_location',
            'event_date',
            'event_start_time',
            'event_end_time',
            'event_url',
            'user_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM rsvp_interested WHERE event.id = rsvp_interested.event_id)'), 'rsvp_interested_count'],
            [sequelize.literal('(SELECT COUNT (*) FROM rsvp_yes WHERE event.id = rsvp_yes.event_id)'), 'rsvp_yes_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'event_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a specific event
router.get('/:id', (req, res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'event_name',
            'event_description',
            'event_location',
            'event_date',
            'event_start_time',
            'event_end_time',
            'event_url',
            'user_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT (*) FROM rsvp_interested WHERE event.id = rsvp_interested.event_id)'), 'rsvp_interested_count'],
            [sequelize.literal('(SELECT COUNT (*) FROM rsvp_yes WHERE event.id = rsvp_yes.event_id)'), 'rsvp_yes_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'event_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post an event
router.post('/', withAuth, (req, res) => {
    Event.create({
        event_name: req.body.event_name,
        event_description: req.body.event_description,
        event_location: req.body.event_location,
        event_date: req.body.event_date,
        event_start_time: req.body.event_start_time,
        event_end_time: req.body.event_end_time,
        event_url: req.body.event_url,
        user_id: req.session.user_id,
        username: req.session.username
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// add an rsvp_interested
router.put('/rsvp_interested',  (req, res) => {
  RSVP_Yes.destroy({
      where: {
          event_id: req.body.event_id, 
          user_id: req.session.user_id ? req.session.user_id : req.body.user_id
      } 
  }) 
  .then(() => {
    RSVP_Interested.create({
        event_id: req.body.event_id, 
        user_id: req.session.user_id ? req.session.user_id : req.body.user_id
    })
    .then(updatedRsvp_InterestedData => {
        RSVP_Interested.findAll({
            where: {
                event_id: req.body.event_id
            }
        }) .then(interested_users => {
           res.json({
            updatedRsvp_InterestedData,
            interested_count: interested_users.length
           })
        })
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })
});

// add an rsvp_yes
router.put('/rsvp_yes',  (req, res) => {
    RSVP_Interested.destroy({
        where: {
            event_id: req.body.event_id, 
            user_id: req.session.user_id ? req.session.user_id : req.body.user_id
        } 
    }) 
    .then(() => {
      RSVP_Yes.create({
          event_id: req.body.event_id, 
          user_id: req.session.user_id ? req.session.user_id : req.body.user_id
      })
      .then(updatedRsvp_YesData => {
          RSVP_Yes.findAll({
              where: {
                  event_id: req.body.event_id
              }
          }) .then(going_users => {
             res.json({
              updatedRsvp_YesData,
              going_count: going_users.length
             })
          })
      })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
  });

// update an event
router.put('/:id', withAuth, (req, res) => {
    Event.update(
        {
            event_name: req.body.event_name,
            event_description: req.body.event_description,
            event_location: req.body.event_location,
            event_date: req.body.event_date,
            event_start_time: req.body.event_start_time,
            event_end_time: req.body.event_end_time
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete an event
router.delete('/:id', withAuth, (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;