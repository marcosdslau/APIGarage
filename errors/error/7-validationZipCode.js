class validationZipCode extends Error{
    constructor(campo){
        const message    = `Invalid ZipCode! [${campo}]: Only numbers.`
        super(message);
        this.name        = "validationZipCode";
        this.idError     = 7;
    }
}
module.exports = validationZipCode;