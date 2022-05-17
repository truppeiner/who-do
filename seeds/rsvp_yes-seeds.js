const { RSVP_Yes } = require('../models');

const rsvp_yes_data = [
  {
    user_id: 1,
    event_id: 2
  },
  {
    user_id: 2,
    event_id: 1
  }
];

const seedRSVP_Yes = () => RSVP_Yes.bulkCreate(rsvp_yes_data);

module.exports = seedRSVP_Yes;