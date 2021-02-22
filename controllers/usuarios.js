const { response } = require('express')
const bcryptjs = require("bcryptjs")
const Usuario = require('../models/usuario');

getUsuarios = async(req, res = response) => {
    //Request tipo 
    //http://localhost:8080/api/usuarios?apiKey=6468496456455664645654&id=4521&page=10
    //const { id, apiKey, page } = req.query;
    const query = { estado: true }; // Query para listar solo los usuarios habilitados
    const { limite = 5, desde = 0 } = req.query;

    /*  //Consulta en la base
      const usuarios = await Usuario.find(query)
          .skip(Number(desde))
          .limit(Number(limite));

      //Contar registros
      const total = await Usuario.countDocuments(query);*/

    //Consulta dos promesas de manera simultanea (Resulta mas eficiente que el metodo anterior)
    const [usuarios, total] = await Promise.all([
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)), //Promera promesa 
        Usuario.countDocuments(query) //Segunda promesa
    ])

    //Contara el numero total de resultados
    //const total = usuarios.length
    res.json({
        total,
        usuarios
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

putUsuarios = async(req, res = response) => {
    //Request tipo
    //http://localhost:8080/api/usuarios/10
    const { id } = req.params; //Extraemos el id del params
    const { google, correo, password, ...resto } = req.body //Extraemos 

    if (password) {
        //Encriptamos contrasenna
        const salt = bcryptjs.genSaltSync(10); //asignamos el numero de iteraciones
        resto.password = bcryptjs.hashSync(password, salt); //creamos un hash direccional para el valor del password
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(resto)
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