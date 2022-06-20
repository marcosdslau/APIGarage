class validationEmail extends Error{
    constructor(campo){
        const message    = `The email ${campo} already exists!`
        super(message);
        this.name        = "validationEmail";
        this.idError     = 3;
    }
}
module.exports = validationEmail;