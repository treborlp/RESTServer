const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false,
        required: false
    }
});

//Este metodo quita el usuario y la version (__v) de la respuesta
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario
}

module.exports = model('Usuario', UsuarioSchema)