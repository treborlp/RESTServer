const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias');

const { validarCampos } = require('../middleware/validar-campo');
const validarJWT = require('../middleware/validar-jwt');
const routes = Router();

routes.get('/', (req, res) => {
    return res.status(200).json("get");
})

routes.get('/:id', (req, res) => {

    return res.status(200).json("get-id");
})

routes.post('/', [
    validarJWT,
    check("nombre", "La categoria es necesaria").not().isEmpty(),
    validarCampos
], crearCategoria)

routes.put('/:id', (req, res) => {
    return res.status(200).json("put");
})

routes.delete('/:id', (req, res) => {
    return res.status(200).json("delete");
})


module.exports = routes