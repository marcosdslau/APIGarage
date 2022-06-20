const express = require('express');
const app = express();

const connection = require('./database/database');
const bodyParser = require('body-parser'); ///Pergar dados de formulário
const indexErrors = require('./errors/indexErrors');


const cors = require('cors');

app.use(cors());
//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/**
 * **************************************************
 *        Conexão com o Banco de Dados
 * **************************************************
 */
connection.authenticate().then(() => {
    console.log(`
 *********************************************
        CONECTADO COM SUCESSO AO
            BANCO DE DADOS!
 *********************************************`);
}).catch((e) =>{
    console.log(e);
})


/**
 * **************************************************
 *          Importação dos CONTROLLERS
 * **************************************************
 */
const AuthController                  = require('./src/#auth/AuthController');
const UsersController                 = require('./src/users/UsersController');
const PersonController                 = require('./src/persons/PersonController');
const CarsController                 = require('./src/cars/CarsController');
const RentsController                 = require('./src/rents/RentsController');

/**
 * **************************************************
 *                    ROUTES
 * **************************************************
 */

app.use('/', AuthController);
app.use('/', UsersController);
app.use('/', PersonController);
app.use('/', CarsController);
app.use('/', RentsController);

/**
 * **************************************************
 *     Classe Customizada para Tratamento de 
 *                   Erros
 * **************************************************
 */

app.use(indexErrors);

/**
 * **************************************************
 *             Execução da Aplicação
 * **************************************************
 */


app.listen("8000", () =>{
    console.log("Running Server!!");
});