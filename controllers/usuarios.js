const { response } = require('express')
const bcryptjs = require("bcryptjs")
const Usuario = require('../models/usuario');

getUsuarios = (req, res = response) => {
    //Request tipo 
    //http://localhost:8080/api/usuarios?apiKey=6468496456455664645654&id=4521&page=10
    const { id, apiKey, page } = req.query;

    res.json({
        "mensaje": "ok getUsuarios",
        id,
        apiKey,
        page
    })
}

postUsuarios = async(req, res = response) => {


    //const { nombre, dni } = req.body
    //const body = req.body 
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptamos contrasenna
    const salt = bcryptjs.genSaltSync(10); //asignamos el numero de iteraciones
    usuario.password = bcryptjs.hashSync(password, salt); //creamos un hash direccional para el valor del password

    //Guardamos en la base de datos
    await usuario.save();

    res.json({
        usuario
    })
}

putUsuarios = (req, res = response) => {
    //Request tipo
    //http://localhost:8080/api/usuarios/10
    const { id } = req.params;

    res.json({
        "mensaje": "ok putUsuarios",
        id
    })
}

deleteUsuarios = (req, res = response) => {
    res.json({
        "mensaje": "ok deleteUsuarios"
    })
}

patchUsuarios = (req, res = response) => {
    res.json({
        "mensaje": "ok patchUsuarios"
    })
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    patchUsuarios
}