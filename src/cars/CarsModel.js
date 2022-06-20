const Sequelize = require('sequelize');
const connection = require('../../database/database');

const CarsModel = connection.define('tb_cars', {
    idCar: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    model : {
        type: Sequelize.STRING(40),
    },
    brand : {
        type: Sequelize.STRING(40),
    },
    motor : {
        type: Sequelize.STRING(4),
    },
    board : {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    rent : {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

CarsModel.sync({ alter: true });


module.exports = CarsModel;