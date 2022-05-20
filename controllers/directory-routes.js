const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Comment, RSVP_Interested, RSVP_Yes } = require('../models');

router.get('/', (req, res) => {

    if (!req.session.loggedIn) {
        res.render('login-page');
        return;
    }
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
            [sequelize.literal('(SELECT COUNT(*) FROM rsvp_yes WHERE event.id = rsvp_yes.event_id)'), 'rsvp_yes_count']
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'event_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            }
          ]
    })
    .then(dbEventData => {
        const events = dbEventData.map(event => event.get({ plain: true }));

        res.render('directory', {
            events,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// login route
router.get('/login', (req, res) =>{
  if(req.session.loggedIn){
      res.render('directory');
      return;
  }
  res.render('login-page');
});

// individual event
router.get('/event/:id', (req, res) => {
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
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'event_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbEventData => {
    if (!dbEventData) {
      res.status(404).json({ message: 'No events found with this id!' });
      return;
    }

    const event = dbEventData.get({ plain: true });

    res.render('single-post', {
      event,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
