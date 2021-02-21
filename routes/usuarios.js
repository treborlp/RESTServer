const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/usuarios');
const { validarCampos } = require('../middleware/validar-campo');
const RoleSchema = require('../models/role');
const routes = Router();

routes.get('/', getUsuarios)
routes.post('/', [
    check('nombre', 'El nombre no debe estar vacio').not().isEmpty(),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('password', 'Password no tiene el formato').isLength({ max: 30, min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol').custom(async(rol = '') => {
        const existeRol = await RoleSchema.findOne({ rol });
        if (!existeRol) {
            throw new Error(`El rol: ${rol} no se encuentra registrado`)
        }
    }),
    validarCampos
], postUsuarios)
routes.put('/:id', putUsuarios)
routes.delete('/', deleteUsuarios)
routes.patch('/', patchUsuarios)

module.exports = routes