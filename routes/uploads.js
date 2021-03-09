const { Router } = require('express');
const { check } = require('express-validator');
const { uploads, actualizarImagenCategoria } = require('../controllers/uploads');
const { colecionesPermitidas } = require('../helpers');

const { validarCampos, validarExisteArchivoImagen } = require('../middleware/');
const routes = Router();

routes.post('/', validarExisteArchivoImagen, uploads);
routes.put('/:coleccion/:id', [
    validarExisteArchivoImagen,
    check('id', 'no es un id mongo').isMongoId(),
    check('coleccion', 'no permitida').custom(c => colecionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCategoria)



module.exports = routes