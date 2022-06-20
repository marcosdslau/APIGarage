class validationToken extends Error{
    constructor(){
        const message    = 'Invalid Token!'
        super(message);
        this.name        = "validationToken";
        this.idError     = 5;
    }
}
module.exports = validationToken;