class validationIdReference extends Error{
    constructor(campo, id){
        const message    = `${campo}(${id}): value does not exist in reference table!`
        super(message);
        this.name        = "validationIdReference";
        this.idError     = 8;
    }
}
module.exports = validationIdReference;