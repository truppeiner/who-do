// import all models
const Event = require('./Event');
const User = require('./User');
const Comment = require('./Comment');
const RSVP_Yes = require('./RSVP_Yes');
const RSVP_Interested = require('./RSVP_Interested');


// create associations
User.hasMany(Event, {
  foreignKey: 'user_id'
});

Event.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});


User.belongsToMany(Event, {
  through: RSVP_Yes,
  as: 'going',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Event, {
  through: RSVP_Interested,
  as: 'interested',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Event.belongsToMany(User, {
  through: RSVP_Yes,
  as: 'going',
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

Event.belongsToMany(User, {
  through: RSVP_Interested,
  as: 'interested',
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

RSVP_Yes.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

RSVP_Interested.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

RSVP_Yes.belongsTo(Event, {
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

RSVP_Interested.belongsTo(Event, {
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

User.hasMany(RSVP_Yes, {
  foreignKey: 'user_id'
});

User.hasMany(RSVP_Interested, {
  foreignKey: 'user_id'
});

Event.hasMany(RSVP_Yes, {
  foreignKey: 'event_id'
});

Event.hasMany(RSVP_Interested, {
  foreignKey: 'event_id'
});


Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Event, {
  foreignKey: 'event_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Event.hasMany(Comment, {
  foreignKey: 'event_id'
});

module.exports = { User, Event, RSVP_Yes, RSVP_Interested};