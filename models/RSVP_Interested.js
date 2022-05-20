const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class RSVP_Interested extends Model {}

RSVP_Interested.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'event',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'rsvp_interested'
  }
);

module.exports = RSVP_Interested;