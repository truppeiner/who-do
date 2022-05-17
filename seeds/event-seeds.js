const { Event } = require('../models');

const eventdata = [
  {
    event_name: 'Super Cool Event of the Century',
    event_description: 'The coolest event you have ever attended',
    event_location: 'Austin, TX',
    event_date: 2022-10-01,
    event_start_time: 090000,
    event_end_time: 120000,
    event_url: 'https://www.supercoolevent.com',
    user_id: 1
  },
  {
    event_name: 'Radical Rad Festathon',
    event_description: 'The raddest event ever',
    event_location: 'Austin, TX',
    event_date: 2022-12-01,
    event_start_time: 090000,
    event_end_time: 120000,
    event_url: 'https://www.radicalradfest.com',
    user_id: 2
  }
    
];

const seedEvents = () => Event.bulkCreate(eventdata);

module.exports = seedEvents;
