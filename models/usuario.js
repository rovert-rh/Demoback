const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido:{
        type: String,
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    username:{
        type: String
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        default: 'VIEWER'
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.methods.toJSON = function () {
    const {__v , password, _id, ... usuario} = this.toObject();
    usuario.uid=_id;
    return usuario
    
}

module.exports = model ('Usuario', UsuarioSchema);