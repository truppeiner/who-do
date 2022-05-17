const Sequelize = require('sequelize');

require('dotenv').config();

<<<<<<< HEAD
// create connection to our database through sequelize
const sequelize = process.env // database name goes after '.env'
    ? new Sequelize(process.env)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
=======
// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
>>>>>>> develop
    });

module.exports = sequelize;