const express = require("express");
const Router = express.Router();
const RentsObj = require('./RentsObject');
const CarsObj = require('../cars/CarsObject');
const returns = require('../defaultReturns');
const authenticate = require('../../middlewares/authenticate');

////// BUSCA TODOS  NO BANCO DE DADOS //////
Router.get('/rents', authenticate, async (req, res, next) => {
    var data = [];
    try{
        const newRent = new RentsObj();
        if(req.query.idPerson){
            data = await newRent.Search.AllForPersonPending(parseInt(req.query.idPerson));
            res.status(200);
            res.json({
                message: returns('get', data),
                data: data
            });
        } else if(req.query.dashboard){
            const car = new CarsObj();
            const cars = await car.Search.All();
            const nameCars = cars.map(car =>{
                return car.name;
            });
            let DataCars = [];
            let differPersonsForCars = [];
            for(let car of cars){
                let arr = [];
                const consultRent = new RentsObj();
                const listRent = await consultRent.Search.AllForCar(car.idCar);
                listRent.forEach((elemem =>{
                    if(!arr.includes(elemem.idPerson)){
                        arr.push(elemem.idPerson)
                    }
                }));
                differPersonsForCars.push(arr.length);
                DataCars.push(listRent.length)
            }
            console.log(differPersonsForCars);
            res.status(200);
            res.json({
                message: returns('get', data),
                data: {
                    labels: nameCars,
                    datasets: [
                        {
                            label: 'Qtd. de Empréstimos',
                            backgroundColor: '#2E7D32',
                            data: DataCars
                        },
                        {
                            label: 'Qtd. de Locatários',
                            backgroundColor: '#EF5350',
                            data: differPersonsForCars
                        }
                    ]
                }
            });
        } else if(req.query.nowRents){
            const car = new CarsObj()
            let auxArr = await car.Search.All();
            let rentsTrue = auxArr.filter(a => a.rent === true);
            let rentsFalse = auxArr.filter(a => a.rent === false);
            res.status(200);
            res.json({
                message: returns('get', data),
                data: {
                    labels: ['Carros Emprestados', 'Carros Disponíveis', ],
                    datasets: [
                        {
                            label: 'Situação Geral Carros',
                            backgroundColor: ['#3F51B5', '#E46651'],
                            data: [rentsTrue.length, rentsFalse.length]
                        },
                    ]
                }
            });
        } else{
            data = await newRent.Search.All();
            res.status(200);
            res.json({
                message: returns('get', data),
                data: data
            });
        }


    } catch(e){
        next(e)
    }
});

////// BUSCA PELO ID //////
Router.get('/rents/:idRent', authenticate, async (req, res, next) => {
    var data;
    try{
        const idRent = parseInt(req.params.idRent);
        const newRent = new RentsObj();
        newRent.Validation.Id(req.params);
        data = await newRent.Search.Id(idRent);
        res.status(200);
        res.json({
            message: returns('get', data),
            data: data
        });
    } catch(e){
        next(e);
    }
});

////// CRIAR  //////
Router.post('/rents', authenticate, async (req, res, next) => {
    var data;
    const {idPerson, idCar, startDate, endDate, rent} = req.body;
    try {
        const newRent = new RentsObj();
        newRent.Validation.Fields(req.body);
        data = await newRent.Create.New(parseInt(idPerson), parseInt(idCar), startDate, endDate, rent);
        const car = new CarsObj();
        await car.Update.Rend(parseInt(idCar), rent);
        // CarsObj
        res.status(200);
        res.json({
            message: returns('post'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});

////// Editar  //////
Router.put('/rents/:idRent', authenticate, async (req, res, next) => {
    var data;
    const {idPerson, idCar, startDate, endDate, rent} = req.body;
    try {
        const idRent = parseInt(req.params.idRent);
        const newRent = new RentsObj();

        newRent.Validation.Id(req.params);
        newRent.Validation.Fields(req.body);

        await newRent.Update.Item(idRent, idPerson, idCar, startDate, endDate, rent);
        data = await newRent.Search.Id(idRent);
        res.status(200);
        res.json({
            message: returns('update'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});

Router.patch('/rents/:idRent', authenticate, async (req, res, next) => {
    var data;
    const {idCar, devolutionDate} = req.body;
    const idRent = parseInt(req.params.idRent);
    try {
        const newRent = new RentsObj();
        newRent.Validation.Id(req.params);
        newRent.Validation.IdCar(req.body);
        data = await newRent.Update.Devolution(idRent, devolutionDate, false);
        const car = new CarsObj();
        await car.Update.Rend(parseInt(idCar), false);
        res.status(200);
        res.json({
            message: returns('post'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});
Router.patch('/rents/:idRent/renew', authenticate, async (req, res, next) => {
    var data;
    const {idCar, endDate} = req.body;
    const idRent = parseInt(req.params.idRent);
    try {
        const newRent = new RentsObj();
        newRent.Validation.Id(req.params);
        newRent.Validation.IdCar(req.body);
        let rent = await newRent.Search.Id(idRent);
        let dateNow = new Date();
        await newRent.Update.Devolution(idRent, dateNow, false);
        data = await newRent.Create.New(parseInt(rent.idPerson), parseInt(rent.idCar), dateNow, endDate, true);
        res.status(200);
        res.json({
            message: returns('post'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});



module.exports = Router;