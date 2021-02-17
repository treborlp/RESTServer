const { Router } = require('express');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios, patchUsuarios } = require('../controllers/usuarios');
const routes = Router();

routes.get('/', getUsuarios)
routes.post('/', postUsuarios)
routes.put('/', putUsuarios)
routes.delete('/', deleteUsuarios)
routes.patch('/', patchUsuarios)

module.exports = routes