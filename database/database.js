const Sequelize = require('sequelize');

const connection = new Sequelize('db_garage', 'postgres', '14253636', {
    host: 'localhost',
    // host: '189.34.0.42',
    // host: 'bdPostgres',
    dialect: 'postgres',
    port: '5432',
    timezone: '-03:00'
});

module.exports = connection;