const express = require("express");
const Router = express.Router();
const UsersObj = require('../users/UsersObject');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const authenticate = require('../../middlewares/authenticate');
const secretKey = 'asdfqwerzxcv'; //// Chave secreta para descriptaro JWT

Router.post('/login', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const users = new UsersObj('', email, password, '');
        users.Validation.FieldsLogin(req.body);
        const auth = await users.Search.Email(email);
        users.Validation.Login(auth);
        users.Validation.UserInative(auth.status);
        let permissions = users.Validation.UserPermissions(auth.type);
        // console.log(req);
        const authTrue = bcrypt.compareSync(password, auth.password);
        if(authTrue){
            jwt.sign({
                idUser: auth.idUser,
                email: auth.email,
                UserName: auth.name,
                UserPhoto: 'https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-criador-de-avatar-masculino.jpg',
                UserType: auth.type,
            }, secretKey, {
                expiresIn: '24h' ///// Tempo para o Token Expirar
            }, (err, tokenJWT) => {
                if(err){
                    res.status(400);
                    res.json({message: 'bad request!'})
                } else {
                    res.status(200);
                    res.json({
                        idUser: auth.idUser,
                        email: auth.email,
                        UserName: auth.name,
                        UserPhoto: 'https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-criador-de-avatar-masculino.jpg',
                        info: {permissions: permissions},
                        token: tokenJWT
                    })
                }
            });
        } else{
            users.Validation.Login(undefined);
        }
    } catch (e) {
        next(e);
    }
});

Router.post('/validate', authenticate, (req, res, next) => {
    res.status(200);
    res.json({
        permission: true,
        info: { ...req.loggedUser}
    });
});


module.exports = Router;