const PersonModel              = require('./PersonModel');
const filedsRequired          = require('../../errors/error/1-filedsRequired');
const validationId            = require('../../errors/error/2-validationId');

class Search{
    All(){
        return PersonModel.findAll();
    }
    Id(value){
        return PersonModel.findByPk(value);
    }
}

class Create{
    async New(name, cpf, socialName, country, atived){
        return PersonModel.create({
            name,
            cpf,
            socialName,
            country,
            atived
        });
    }
}

class Update{
    Item(idPerson, name, cpf, socialName, country, atived){      
        return PersonModel.update({
            name,
            cpf,
            socialName,
            country,
            atived
        },{
            where: {
                idPerson: idPerson
            }
        })
    }
}

class Delete{
    Item(idPerson){
        PersonModel.destroy({
            where:{
                idPerson: idPerson
            }
        })
    }
}

class Validation {
    Id(fields){
        if(isNaN(fields.idPerson)){
            throw new validationId('idPerson');
        }
        if(!fields.idPerson){
            throw new filedsRequired('idPerson');
        }
    }
    Fields(fields){
        if(!fields.name){
            throw new filedsRequired('name');
        }
        if(!fields.cpf){
            throw new filedsRequired('cpf');
        }
    }    
}

class Person{
    constructor(name, cpf, socialName, country, atived){
        this.name = name;
        this.cpf = cpf;
        this.socialName = socialName;
        this.country = country;
        this.atived = atived;

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


module.exports = Person;