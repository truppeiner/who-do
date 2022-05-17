const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, Comment, RSVP_Interested, RSVP_Yes } = require('../models');

router.get('/', (req, res) => {

    if (!req.session.loggedIn) {
        res.render('login');
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
              model: models.Comment,
              attributes: ['id', 'comment_text', 'event_id', 'user_id', 'created_at'],
              include: {
                model: models.User,
                attributes: ['username']
              }
            }
          ]
    })
    .then(dbEventData => {
        const events = dbEventData.map(event => event.get({ plain: true }));

        res.render('homepage', {
            events,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;