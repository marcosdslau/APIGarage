const fieldsRequired = require('./error/1-filedsRequired');
const validationId = require('./error/2-validationId');
const validationEmail = require('./error/3-validationEmail');
const validationLogin = require('./error/4-validationLogin');
const validationToken = require('./error/5-validationToken');
const validationCpf = require('./error/6-validationCpf');
const validationZipCode = require('./error/7-validationZipCode');
const validationIdReference = require('./error/8-validationIdReference');
const validationPermission = require('./error/9-validationPermission')
const requiredQueryParams = require('./error/10-typeQueryParams')

module.exports = (err, req, res, next) => {
    let status = 500;
    /**
     * Erros Validação;
     */
    // console.log(req);
    if(err instanceof fieldsRequired){
        status = 406;
    }
    if(err instanceof validationId){
        status = 400;
    }
    if(err instanceof validationEmail){
        status = 409;
    }
    if(err instanceof validationLogin){
        status = 401;
    }
    if(err instanceof validationToken){
        status = 401;
    }
    if(err instanceof validationCpf){
        status = 401;
    }
    if(err instanceof validationZipCode){
        status = 401;
    }
    if(err instanceof validationIdReference){
        status = 401
    }
    if(err instanceof validationPermission){
        status = 401
    }
    if(err instanceof requiredQueryParams){
        status = 422
    }


    /**
     * 
     * Erros Operação;
     * 
     */
    if(err.parent){
        if(err.parent.code == 23505){
            status = 409;
            err.message = 'Value already exists!';
            err.idError = 10000;
        }
        if(err.parent.code == 23503){
            status = 409;
            err.message = `${err.CustomMessage}: value does not exist in reference table`;
            err.idError = 10001;
        }
        if(err.parent.code == '22P02'){
            status = 409;
            err.idError = 10002;
            if(err.parent.routine == 'boolin'){
                err.message = 'Invalid boolean data type!';
            }
            if(err.parent.routine == 'pg_strtoint32'){
                err.message = 'Invalid Integer data type!';
            }
            // err.message = 'Foreign key not informed';
        }
    } 
    console.log(err.parent)

    res.status(status);
    res.json({
        message: err.message,
        idError: err.idError
    });
    
}

