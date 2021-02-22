const RoleSchema = require('../models/role');
const UsuarioSchema = require('../models/usuario');

const validarRol = async(rol = '') => {
    const existeRol = await RoleSchema.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol: ${rol} no se encuentra registrado`)
    }
}

//Verificamos si el correo existe

const validarCorreo = async(correo) => {

    const correoExiste = await UsuarioSchema.findOne({ correo }); //Consultamos a la base de datos si el correo ya existe
    if (correoExiste) {
        throw new Error(`El correo ya existe`)
    }
}

const validarExisteID = async(id) => {

    const usuarioExiste = await UsuarioSchema.findById(id); //Consultamos a la base de datos si el correo ya existe
    if (!usuarioExiste) {
        throw new Error(`El usuario no existe en la base de datos`)
    }
}




module.exports = {
    validarRol,
    validarCorreo,
    validarExisteID
}