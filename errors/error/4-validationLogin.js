class validationLogin extends Error{
    constructor(){
        const message    = 'Invalid email or password!'
        super(message);
        this.name        = "validationLogin";
        this.idError     = 4;
    }
}
module.exports = validationLogin;