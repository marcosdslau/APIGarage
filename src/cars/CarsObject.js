const CarsModel              = require('./CarsModel');
const filedsRequired          = require('../../errors/error/1-filedsRequired');
const validationId            = require('../../errors/error/2-validationId');
const requiredQueryParams     = require('../../errors/error/10-typeQueryParams')

class Search{
    All(){
        return CarsModel.findAll();
    }
    AllAvailable(value){
        return CarsModel.findAll({
            where: {
                rent: value
            }
        });
    }
    Id(value){
        return CarsModel.findByPk(value);
    }
}

class Create{
    async New(name, model, brand, motor, board){
        return CarsModel.create({
            name,
            model,
            brand,
            motor,
            board
        });
    }
}

class Update{
    Item(idCar, name, model, brand, motor, board){      
        return CarsModel.update({
            name,
            model,
            brand,
            motor,
            board
        },{
            where: {
                idCar: idCar
            }
        })
    }
    Rend(idCar, rent){      
        return CarsModel.update({
            rent
        },{
            where: {
                idCar: idCar
            }
        })
    }
}

class Delete{
    Item(idCar){
        CarsModel.destroy({
            where:{
                idCar: idCar
            }
        })
    }
}

class Validation {
    Id(fields){
        if(isNaN(fields.idCar)){
            throw new validationId('idCar');
        }
        if(!fields.idCar){
            throw new filedsRequired('idCar');
        }
    }
    Fields(fields){
        if(!fields.name){
            throw new filedsRequired('name');
        }
        if(!fields.board){
            throw new filedsRequired('board');
        }
    }
    Rent(fields){
        if(typeof fields.rents !== 'boolean'){
            throw new requiredQueryParams('rents');
        }
    }
    ErrorQueryParam(){
        throw new requiredQueryParams();
    }
}

class Car{
    constructor(name, model, brand, motor, board){
        this.name = name;
        this.model = model;
        this.brand = brand;
        this.motor = motor;
        this.board = board;

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