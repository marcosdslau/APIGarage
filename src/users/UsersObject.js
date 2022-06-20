const UsersModel              = require('./UsersModel');
const bcrypt                  = require("bcrypt");
const filedsRequired          = require('../../errors/error/1-filedsRequired');
const validationId            = require('../../errors/error/2-validationId');
const validationEmail         = require('../../errors/error/3-validationEmail');
const validationLogin         = require('../../errors/error/4-validationLogin');

class Search{
    All(){
        return UsersModel.findAll({
            attributes: ['idUser', 'name', 'email',  'type', 'status', 'createdAt', 'updatedAt']
        });
    }
    Id(value){
        return UsersModel.findByPk(value);
    }
    Email(value){
        return UsersModel.findOne({
            where:{
                email: value
            }
        });
    }
}

class Create{
    async New(name, email, password, type, status){
        return UsersModel.create({
            name: name,
            email: email,
            password: password,
            type: type,
            status: status
        });
    }
    EncryptPassword (password){
        const salt =  bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
}

class Update{
    Item(idUser, name, email, type, status){      
        return UsersModel.update({
            name: name,
            email: email,
            type: type,
            status: status,
        },{
            where: {
                idUser: idUser
            }
        })
    }
    Password(idUser, password){      
        return UsersModel.update({
            password
        },{
            where: {
                idUser: idUser
            }
        })
    }
    Status(idUser, status){      
        return UsersModel.update({
            status
        },{
            where: {
                idUser: idUser
            }
        })
    }
}

class Delete{
    Item(idUser){
        UsersModel.destroy({
            where:{
                idUser: idUser
            }
        })
    }
}

class Validation {
    Id(fields){
        if(isNaN(fields.idUser)){
            throw new validationId('idUser');
        }
        if(!fields.idUser){
            throw new filedsRequired('idUser');
        }
    }
    Fields(fields){
        if(!fields.name){
            throw new filedsRequired('name');
        }
        if(!fields.email){
            throw new filedsRequired('email');
        }
        if(!fields.password){
            throw new filedsRequired('password');
        }
        if(typeof fields.type !== 'boolean' ){
            throw new filedsRequired('type');
        }
        if(typeof fields.status !== 'boolean' ){
            throw new filedsRequired('status');
        }
    }
    FieldsUpdate(fields){
        if(!fields.name){
            throw new filedsRequired('name');
        }
        if(!fields.email){
            throw new filedsRequired('email');
        }
        if(typeof fields.type !== 'boolean' ){
            throw new filedsRequired('type');
        }
        if(typeof fields.status !== 'boolean'){
            throw new filedsRequired('status');
        }
    }
    FieldsLogin(fields){
        if(!fields.email){
            throw new filedsRequired('email');
        }
        if(!fields.password){
            throw new filedsRequired('password');
        }
    }
    updatePassword(fields){
        if(!fields.password){
            throw new filedsRequired('password');
        }
    }
    Email(value){
        if(value != undefined){
            throw new validationEmail(value.dataValues.email);
        }
    }
    Login(value){
        if(value == undefined){
            throw new validationLogin();
        }
    }
    UserInative(value){
        if(!value){
            throw new validationLogin();
        }
    }
    alterStatus(fields){
        if(typeof fields.status !== 'boolean'){
            throw new filedsRequired('status');
        }
    }
    UserPermissions(value){
        if(value){
            return {
                type: 'Master',
                backend: [
                    {
                        type: 'get',
                        route: ['/user', '/user/:idUser', '/users/types', '/persons', '/persons/:idPerson', '/cars', '/cars/:idCar', '/rents', '/rents/:idRent', ],
                        action: ['*']
                    },
                    {
                        type: 'post',
                        route: ['/user', '/persons', '/cars', '/rents'],
                        action: ['*']
                    },
                    {
                        type: 'patch',
                        route: ['/user/:idUser/status', '/user/:idUser/password', '/rents/:idRent', '/rents/:idRent/renew'],
                        action: ['*']
                    },{
                        type: 'put',
                        route: ['/user/:idUser', '/persons/:idPerson', '/cars/:idCar'],
                        action: ['*']
                    }
                ],
                menu: [
                    {
                        icon: 'mdi-view-dashboard',
                        option:'Dashboad',
                        route: '/',
                        api:[]
                    },
                    {
                        icon: 'mdi-autorenew',
                        option:'Aluguéis',
                        route: '/rents',
                        api:[]
                    },
                    {
                        icon: 'mdi-account',
                        option:'Pessoas',
                        route: '/persons',
                        api:[]
                    },
                    {
                        icon: 'mdi-car',
                        option:'Carros',
                        route: '/cars',
                        api:[]
                    },
                    {
                        icon: 'mdi-account-multiple',
                        option:'Usuários',
                        route: '/users',
                        api:[]
                    },
                ]
            }
        } else{
            return {
                type: 'Gestor',
                backend: [
                    {
                        type: 'get',
                        route: ['/persons', '/persons/:idPerson', '/rents', '/rents/:idRent', ],
                        action: ['*']
                    },
                    {
                        type: 'post',
                        route: ['/persons', '/rents'],
                        action: ['*']
                    },
                    {
                        type: 'patch',
                        route: [ '/rents/:idRent', '/rents/:idRent/renew'],
                        action: ['*']
                    },{
                        type: 'put',
                        route: [ '/persons/:idPerson'],
                        action: ['*']
                    }
                ],
                menu: [
                    {
                        icon: 'mdi-view-dashboard',
                        option:'Dashboad',
                        route: '/',
                        api:[]
                    },
                    {
                        icon: 'mdi-autorenew',
                        option:'Aluguéis',
                        route: '/rents',
                        api:[]
                    },
                    {
                        icon: 'mdi-account',
                        option:'Pessoas',
                        route: '/persons',
                        api:[]
                    },
                ]
            }
        }
    }
}

class Users{
    constructor(name, email, password, type, status){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.status = status;
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


module.exports = Users;