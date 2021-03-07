const { Router } = require('express');
const { check } = require('express-validator');
const { uploads, actualizarImagenCategoria } = require('../controllers/uploads');
const { colecionesPermitidas } = require('../helpers');

const { validarCampos } = require('../middleware/validar-campo');
const routes = Router();

routes.post('/', uploads);
routes.put('/:coleccion/:id', [
    check('id', 'no es un id mongo').isMongoId(),
    check('coleccion', 'no permitida').custom(c => colecionesPermitidas(c, ['usuarios', 'categorias'])),
    validarCampos
], actualizarImagenCategoria)



module.exports = routes