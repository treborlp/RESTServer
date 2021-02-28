const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaUnica,
    actualizarCategoria
} = require('../controllers/categorias');
const { validarExisteCategoria } = require('../helpers/db-validator');

const { validarCampos } = require('../middleware/validar-campo');
const validarJWT = require('../middleware/validar-jwt');
const routes = Router();

routes.get('/', obtenerCategorias)

routes.get('/:id', [
    check("id", "el identificador no tiene la estructura de mongo").isMongoId(),
    check("id", "La categoria no existe").custom(validarExisteCategoria),
    validarCampos
], obtenerCategoriaUnica)

routes.post('/', [
    validarJWT,
    check("nombre", "La categoria es necesaria").not().isEmpty(),
    validarCampos
], crearCategoria)


//Cualquiera con token valido 
routes.put('/:id',
    check("id", "el identificador no tiene la estructura de mongo").isMongoId(),
    check("id", "La categoria no existe").custom(validarExisteCategoria),
    validarJWT,
    validarCampos, actualizarCategoria)


//Borrar categoria - solo admin
routes.delete('/:id', (req, res) => {
    return res.status(200).json("delete");
})


module.exports = routes