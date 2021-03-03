const { response } = require("express")
const { ObjectId } = require("mongoose").Types;
const UsuarioSchema = require('../models/usuario');

const colecionesPermitidas = [
    'categorias',
    'productos',
    'usuarios',
    'roles'
];

const buscarUsuarios = async(termino, res = response) => {
    const esMongoID = ObjectId.isValid(termino); //Identifica si es un id de mongo

    if (esMongoID) {
        const usuario = await UsuarioSchema.findById(termino);
        res.json({
            respuesta: (usuario) ? usuario : []
        })
    }
}

const buscarController = async(req, res) => {

    const { coleccion, termino } = req.params;

    if (!colecionesPermitidas.includes(coleccion)) {
        return res.status(401).json({
            msj: "La categoria no existe"
        })
    }

    switch (coleccion) {
        case 'categorias':
            res.status(200).json({
                msj: "listamos categorias"
            })
            break;
        case 'productos':
            break;
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'roles':
            res.status(200).json({
                msj: "listamos roles"
            })
            break;

        default:
            res.status(500).json({
                msj: "Error en el servidor"
            })
            break;
    }

}

module.exports = buscarController