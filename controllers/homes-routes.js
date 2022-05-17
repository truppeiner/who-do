const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Comment, Event, RSVP_Yes, RSVP_Interested} = require('../models');

// return data
router.get('/', (req,res) =>{
    res.render('directory');
});

// // login route
// router.get('/login', (req, res) =>{
//     if(req.session.loggedIn){
//         res.render('directory');
//         return;
//     }
// });

module.exports = router;

