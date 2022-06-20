class validationId extends Error{
    constructor(campo){
        const message    = `Invalid ID! [${campo}]: Only numbers.`
        super(message);
        this.name        = "validationId";
        this.idError     = 2;
    }
}
module.exports = validationId;