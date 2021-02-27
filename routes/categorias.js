const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campo');
const routes = Router();

routes.get('/', (req, res) => {
    return res.status(200).json("get");
})

routes.get('/:id', (req, res) => {

    return res.status(200).json("get-id");
})

routes.post('/', (req, res) => {
    return res.status(200).json("post");
})

routes.put('/:id', (req, res) => {
    return res.status(200).json("put");
})

routes.delete('/:id', (req, res) => {
    return res.status(200).json("delete");
})


module.exports = routes