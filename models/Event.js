const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create Event model
class Event extends Model {
  

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
