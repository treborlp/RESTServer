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




module.exports = {
    validarRol,
    validarCorreo
}