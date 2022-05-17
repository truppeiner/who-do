const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database through sequelize
const sequelize = process.env // database name goes after '.env'
    ? new Sequelize(process.env)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });

module.exports = sequelize;