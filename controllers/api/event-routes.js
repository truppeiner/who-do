const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, User, Comment, RSVP_Interested, RSVP_Yes } = require('../../models');

// get all events
router.get('/', (req, res) => {
    
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