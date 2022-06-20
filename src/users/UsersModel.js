const Sequelize = require('sequelize');
const connection = require('../../database/database');
const bcrypt = require("bcrypt");

const UserModel = connection.define('tb_users', {
    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    email : {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false
    },
    password : {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    type:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    status : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
});

UserModel.sync({ alter: true });
(async () => {
    try {
        let searchEmail = await UserModel.findOne({
            where:{
                email: 'master@lau.com'
            }
        });
        if(!searchEmail){
            const salt =  bcrypt.genSaltSync(10);
            var hash =  bcrypt.hashSync('14253636', salt);
            await UserModel.create({
                name: 'UserMaster',
                email: 'master@lau.com',
                password: hash,
                type: true,
                status: true
            });
        }
    } catch (e) {
        console.log(e);
    }
})();


module.exports = UserModel;