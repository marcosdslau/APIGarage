class validationEmail extends Error{
    constructor(campo){
        const message    = `The Cpf ${campo} already exists!`
        super(message);
        this.name        = "validationCpf";
        this.idError     = 6;
    }
}
module.exports = validationEmail;