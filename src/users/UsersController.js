const express = require("express");
const Router = express.Router();
// const bcrypt = require("bcrypt");
const UsersObj = require('./UsersObject');
const returns = require('../defaultReturns');
const authenticate = require('../../middlewares/authenticate');
const { user } = require("pg/lib/defaults");

////// BUSCA TODOS  NO BANCO DE DADOS //////
Router.get('/user', authenticate, async (req, res, next) => {
    var data = [];
    try{
        const users = new UsersObj();
        data = await users.Search.All();
        res.status(200);
        res.json({
            message: returns('get', data),
            data: data
        });
    } catch(e){
        next(e)
    }
});
////// BUSCA PELO ID //////
Router.get('/user/:idUser', authenticate, async (req, res, next) => {
    var data;
    try{
        const idUser = parseInt(req.params.idUser);
        const users = new UsersObj();
        users.Validation.Id(req.params);
        data = await users.Search.Id(idUser);
        delete data.password;
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
Router.post('/user', authenticate, async (req, res, next) => {
    var data;
    const {name, email, password, type, status} = req.body;
    try {
        const users = new UsersObj(name, email, '', type, status);
        users.password =  users.Create.EncryptPassword(password);
        users.Validation.Fields(req.body);
        searchEmail = await users.Search.Email(email);
        users.Validation.Email(searchEmail);
        data = await users.Create.New(users.name, users.email, users.password, users.type, users.status);
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
Router.put('/user/:idUser', authenticate, async (req, res, next) => {
    var data;
    const {name, email, type, status} = req.body;
    try {
        const idUser = parseInt(req.params.idUser);
        const users = new UsersObj();

        users.Validation.Id(req.params);
        users.Validation.FieldsUpdate(req.body);

        await users.Update.Item(idUser, name, email, type, status);
        data = await users.Search.Id(idUser);
        res.status(200);
        res.json({
            message: returns('update'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});

Router.patch('/user/:idUser/password', authenticate, async (req, res, next) => {
    var data;
    const idUser = parseInt(req.params.idUser);
    const {password} = req.body;
    try {
        const users = new UsersObj();
        users.Validation.Id(req.params);
        users.Validation.updatePassword(req.body);
        let newPassword = users.Create.EncryptPassword(password);
        await users.Update.Password(idUser, newPassword);
        data = await users.Search.Id(idUser);
        res.status(200);
        res.json({
            message: returns('update'),
            data: data
        });
    } catch (e) {
        next(e);
    }

});
Router.patch('/user/:idUser/status', authenticate, async (req, res, next) => {
    var data;
    const idUser = parseInt(req.params.idUser);
    const {status} = req.body;
    try {
        const users = new UsersObj();
        users.Validation.Id(req.params);
        users.Validation.alterStatus(req.body);
        await users.Update.Status(idUser, status);
        data = await users.Search.Id(idUser);
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