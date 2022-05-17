const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create Event model
class Event extends Model {
  static rsvp_yes(body, models) {
    return models.RSVP_Yes.create({
      user_id: body.user_id,
      event_id: body.event_id
    }).then(() => {
      return Event.findOne({
        where: {
          id: body.event_id
        },
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
          [sequelize.literal('(SELECT COUNT(*) FROM rsvp_yes WHERE event.id = rsvp_yes.event_id)'), 'rsvp_yes_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'event_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
  static rsvp_interested(body, models) {
    return models.RSVP_Interested.create({
      user_id: body.user_id,
      event_id: body.event_id
    }).then(() => {
      return Event.findOne({
        where: {
          id: body.event_id
        },
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
          [sequelize.literal('(SELECT COUNT(*) FROM rsvp_interested WHERE event.id = rsvp_interested.event_id)'), 'rsvp_interested_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'event_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

// create fields/columns for Event model
Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },  
    event_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_date: {
      // yyyy:mm:dd
    type: DataTypes.DATEONLY,
    allowNull: false
    },
    event_start_time: {
      // hh:mm
      type: DataTypes.TIME,
      allowNull: false
    },
    event_end_time: {
      // hh:mm
      type: DataTypes.TIME
    },
    event_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isURL: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'event'
  }
);

module.exports = Event;
