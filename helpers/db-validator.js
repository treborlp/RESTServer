const RoleSchema = require('../models/role');

const validarRol = async(rol = '') => {
    const existeRol = await RoleSchema.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol: ${rol} no se encuentra registrado`)
    }
}

module.exports = validarRol