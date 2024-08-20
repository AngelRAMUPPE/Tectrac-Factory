const {Schema, model, default: mongoose}  = require('mongoose');


const Usuario = mongoose.model('Usuario', new mongoose.Schema(
    {
        Nombre : {type: String, required: true},
        Apellidos: {type: String, required: true},
        Correo: {type: String, required: true},
        Contraseña: {type: String, required: true},
        Celular: {type: String, required: true}
    }
));

module.exports=Usuario;