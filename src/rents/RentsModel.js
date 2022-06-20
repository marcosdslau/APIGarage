const Sequelize = require('sequelize');
const connection = require('../../database/database');
const PersonModel = require('../persons/PersonModel');
const CarModel = require('../cars/CarsModel');

const RentsModel = connection.define('tb_rents', {
    idRent: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate : {
        type: Sequelize.DATE,
    },
    endDate : {
        type: Sequelize.DATE,
    },
    devolutionDate : {
        type: Sequelize.DATE,
    },
    rent : {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

/*
    *  1 Pessoa contratante Possui muitos alguéis
    *  Um aluguel pertence a 1 pessoa contratante;
    */
PersonModel.hasMany(RentsModel, {
    foreignKey: 'idPerson',
    references: {
        model: PersonModel,
        key: 'idPerson'
    }
});
RentsModel.belongsTo(PersonModel, {
    foreignKey: 'idPerson',
    references: {
        model: PersonModel,
        key: 'idPerson'
    }
});

/*
    *  1 Carro contratado Possui muitos alguéis
    *  Um aluguel pertence a 1 Carro contratado;
    */
CarModel.hasMany(RentsModel, {
    foreignKey: 'idCar',
    references: {
        model: CarModel,
        key: 'idCar'
    }
});
RentsModel.belongsTo(CarModel, {
    foreignKey: 'idCar',
    references: {
        model: CarModel,
        key: 'idCar'
    }
});

RentsModel.sync({ alter: true });


module.exports = RentsModel;