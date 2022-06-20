class fieldsRequired extends Error{
    constructor(campo){
        const message    = `Required fields are empty! ${campo}.`
        super(message);
        this.name        = "fieldsRequired";
        this.idError     = 1;
    }
}
module.exports = fieldsRequired;