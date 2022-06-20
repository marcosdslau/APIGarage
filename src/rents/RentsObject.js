const RentsModel              = require('./RentsModel');
const PersonsModel            =require('../persons/PersonModel');
const CarsModel            =require('../cars/CarsModel');
const filedsRequired          = require('../../errors/error/1-filedsRequired');
const validationId            = require('../../errors/error/2-validationId');

class Search{
    All(){
        return RentsModel.findAll({
            include: [PersonsModel, CarsModel]
        });
    }
    Id(value){
        return RentsModel.findByPk(value);
    }
    async AllForCar(value){
        return await RentsModel.findAll({
            where: {
                idCar: value
            },
        });
    }
    AllForPerson(value){
        return RentsModel.findAll({
            where: {
                idPerson: value
            },
            include: [PersonsModel, CarsModel]
        });
    }
    AllForPersonPending(value){
        return RentsModel.findAll({
            where: {
                idPerson: value,
                rent: true
            },
            include: [PersonsModel, CarsModel]
        });
    }
}

class Create{
    async New(idPerson, idCar, startDate, endDate, rent){
        return RentsModel.create({
            idPerson,
            idCar,
            startDate,
            endDate,
            rent,
        });
    }
}

class Update{
    Item(idRent, idPerson, idCar, startDate, endDate, rent){      
        return RentsModel.update({
            idPerson,
            idCar,
            startDate,
            endDate,
            rent,
        },{
            where: {
                idRent: idRent
            }
        })
    }
    Devolution(idRent, devolutionDate, rent){      
        return RentsModel.update({
            devolutionDate,
            rent,
        },{
            where: {
                idRent: idRent
            }
        })
    }
}

class Delete{
    Item(idRent){
        RentsModel.destroy({
            where:{
                idRent: idRent
            }
        })
    }
}

class Validation {
    Id(fields){
        if(isNaN(fields.idRent)){
            throw new validationId('idRent');
        }
        if(!fields.idRent){
            throw new filedsRequired('idRent');
        }
    }
    Fields(fields){
        if(isNaN(fields.idPerson)){
            throw new validationId('idPerson');
        }
        if(!fields.idPerson){
            throw new filedsRequired('idPerson');
        }
        if(isNaN(fields.idCar)){
            throw new validationId('idCar');
        }
        if(!fields.idCar){
            throw new filedsRequired('idCar');
        }
        if(!fields.startDate){
            throw new filedsRequired('startDate');
        }
        if(!fields.endDate){
            throw new filedsRequired('endDate');
        }
    }
    IdCar(fields){
        if(isNaN(fields.idCar)){
            throw new validationId('idCar');
        }
        if(!fields.idCar){
            throw new filedsRequired('idCar');
        }
    } 
}

class Car{
    constructor(idPerson, idCar, startDate, endDate, rent){
        this.idPerson = idPerson;
        this.idCar = idCar;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rent = rent;

        /////    Métodos Consulta    ///////
        this.Search = new Search();
        /////    Métodos Criação     ///////
        this.Create = new Create();
        /////    Métodos Atualização ///////
        this.Update = new Update();
        /////    Métodos Atualização ///////
        this.Delete = new Delete();
        /////      Validação         //////
        this.Validation = new Validation();
    }
}


module.exports = Car;