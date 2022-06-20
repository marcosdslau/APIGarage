const express = require("express");
const Router = express.Router();
const CarObj = require('./CarsObject');
const returns = require('../defaultReturns');
const authenticate = require('../../middlewares/authenticate');

////// BUSCA TODOS  NO BANCO DE DADOS //////
Router.get('/cars', authenticate, async (req, res, next) => {
    var data = [];
    try{

        if(req.query.rents){
            console.log('Entrou na quer')
            const car = new CarObj();
            // car.Validation.Rent(req.query);
            data = await car.Search.AllAvailable(req.query.rents)
            res.status(200);
            res.json({
                message: returns('get', data),
                data: data
            });
        }else{
            const car = new CarObj();
            data = await car.Search.All();
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
Router.get('/cars/:idCar', authenticate, async (req, res, next) => {
    var data;
    console.log(req.params);
    try{
        const idCar = parseInt(req.params.idCar);
        const car = new CarObj();
        car.Validation.Id(req.params);
        data = await car.Search.Id(idCar);
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
Router.post('/cars', authenticate, async (req, res, next) => {
    var data;
    const {name, model, brand, motor, board} = req.body;
    try {
        const car = new CarObj();
        car.Validation.Fields(req.body);
        data = await car.Create.New(name, model, brand, motor, board);
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
Router.put('/cars/:idCar', authenticate, async (req, res, next) => {
    var data;
    const {name, model, brand, motor, board} = req.body;
    try {
        const idCar = parseInt(req.params.idCar);
        const car = new CarObj();

        car.Validation.Id(req.params);
        car.Validation.Fields(req.body);

        await car.Update.Item(idCar, name, model, brand, motor, board);
        data = await car.Search.Id(idCar);
        res.status(200);
        res.json({
            message: returns('update'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});



module.exports = Router;