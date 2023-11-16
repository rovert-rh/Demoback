const {Schema, model} = require('mongoose');

const StreamerSchema = Schema ({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido:{
        type: String,
    },
    username:{
        type: String,
        required: [true, 'El username es obligatorio']
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
    img:{
        type: String,
    },
    rol:{
        type: String,
        default: 'STREAMER'
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    },
    twitch:{
        type: String,
    },
    facebook:{
        type: String,
    },
    instagram:{
        type: String,
    },
    discord:{
        type: String,
    },
});

StreamerSchema.methods.toJSON = function () {
    const {__v , password, _id, ... Streamer} = this.toObject();
    Streamer.uid=_id;
    return Streamer
    
}

module.exports = model ('Streamer', StreamerSchema);