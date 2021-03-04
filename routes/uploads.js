const { Router } = require('express');
const { check } = require('express-validator');
const uploads = require('../controllers/uploads');

const { validarCampos } = require('../middleware/validar-campo');
const routes = Router();

routes.post('/', uploads);



module.exports = routes