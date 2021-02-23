const { Router } = require('express');
const { check } = require('express-validator');
const login = require('../controllers/login');

const { validarCampos } = require('../middleware/validar-campo');
const routes = Router();

routes.post('/login', [
    check('correo', 'No es un correo valido').isEmail(),
    check('password', 'Password no tiene el formato').isLength({ max: 30, min: 6 }),
    check('password', 'Se necesita password').not().isEmpty(),
    validarCampos
], login)

module.exports = routes