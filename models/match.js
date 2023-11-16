
const {Schema, model} = require ('mongoose')

const MatchSchema = Schema ({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    membresia:{
        type: Schema.Types.ObjectId,
        ref: 'Membresia',
        required: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    horario:{
        type:Number,
        default: 0
    },
    zonaH:{
        type:String
    },
    ModoJuego:{
        type:String
    },
    estado:{
        type: Boolean,
        default: true,
    }
});

MatchSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Match', MatchSchema)