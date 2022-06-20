const Sequelize = require('sequelize');
const connection = require('../../database/database');

const PersonModel = connection.define('tb_persons', {
    idPerson: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true
    },
    socialName: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    atived: {
        type: Sequelize.BOOLEAN
    }
});

PersonModel.sync({ alter: true });


module.exports = PersonModel;