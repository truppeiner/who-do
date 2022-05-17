const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, User, Comment, RSVP_Interested, RSVP_Yes, } = require('../../models');

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
router.post('/', (req, res) => {
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

// add/remove/update a rsvp_interested
// router.put('/rsvp_interested', (req, res) => {
//     if (req.session) {
//         Event.rsvp_interested({ ...req.body, user_id: req.session.user_id }, { RSVP_Interested, Comment, User })
//         .then(updatedRsvp_InterestedData => res.json(updatedRsvp_InterestedData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
//     }

// });

// add/remove/update a rsvp_yes
// router.put('/rsvp_yes', (req, res) => {
//     if (req.session) {
//         Event.rsvp_yes({ ...req.body, user_id: req.session.user_id }, { RSVP_Yes, Comment, User })
//         .then(updatedRsvp_YesData => res.json(updatedRsvp_YesData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
//     }

// });

// update an event
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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