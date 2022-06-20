class validationPermission extends Error{
    constructor(){
        const message    = 'Not permission!'
        super(message);
        this.name        = "validationPermission";
        this.idError     = 9;
    }
}
module.exports = validationPermission;