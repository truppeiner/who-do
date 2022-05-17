const seedUsers = require('./user-seeds');
const seedEvents = require('./event-seeds');
const seedComments = require('./comment-seeds');
const seedRSVP_Yes = require('./rsvp_yes-seeds');
const seedRSVP_Interested = require('./rsvp_interested-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedEvents();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  await seedRSVP_Yes();
  console.log('--------------');

  await seedRSVP_Interested();
  console.log('--------------');

  process.exit(0);
};

seedAll();