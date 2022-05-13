const { RSVP_Interested } = require('../models');

const rsvp_interested_data = [
  {
    user_id: 1,
    event_id: 1
  },
  {
    user_id: 2,
    event_id: 2
  }
];

const seedRSVP_Interested = () => RSVP_Interested.bulkCreate(rsvp_interested_data);

module.exports = seedRSVP_Interested;