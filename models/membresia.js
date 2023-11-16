
const {Schema, model} = require ('mongoose')

const membresiaSchema = Schema ({
    nombre: {
        type:String,
        required: [true, 'el nombre es obligatorio'],
        unique: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type:Number,
        default: 0
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    }
});

membresiaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Membresia', membresiaSchema)