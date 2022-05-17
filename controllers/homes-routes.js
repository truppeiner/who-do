const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Event, RSVP_Yes, RSVP_Interested} = require('../models');

// render directory with event information
router.get('/', (req,res) =>{
    Event.findAll({
        attributes: [
            'event_name',
            'event_description',
            'event_location',
            'event_date',
            'event_start_time',
            'event_end_time'
        ],
        include: [
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbEventData => {
        // console.log(dbEventData);
        const events = dbEventData.map(event => event.get({ plain: true }))
        console.log(events)
    res.render('directory', { events });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// // login route
// router.get('/login', (req, res) =>{
//     if(req.session.loggedIn){
//         res.render('directory');
//         return;
//     }
// });

module.exports = router;

