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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a specific event
router.get('/:id', (req, res) => {

});

// post an event
router.post('/', (req, res) => {

});

// update an event
router.put('/:id', (req, res) => {

});

// delete an event
router.delete('/:id', (req, res) => {

});

module.exports = router;