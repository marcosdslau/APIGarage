class requiredQueryParams extends Error{
    constructor(campo){
        const message    = `invalid information type! ${campo}.`
        super(message);
        this.name        = "requiredQueryParams";
        this.idError     = 10;
    }
}
module.exports = requiredQueryParams;