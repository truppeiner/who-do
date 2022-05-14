const router = require('express').Router();
const { User, Event, Comment, RSVP_Interested, RSVP_Yes } = require('../../models');

// get all users
router.get('/', (req, res) => {

});

// get a specific user
router.get('/:id', (req, res) => {

});

// create a user
router.post('/', (req, res) => {

});

// login
router.post('/login', (req, res) => {

});

// logout
router.post('/logout', (req, res) => {

});

// update user
router.put('/:id', (req, res) => {

});

module.exports = router;