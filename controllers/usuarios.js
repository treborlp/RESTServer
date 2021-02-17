const { response } = require('express')

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

postUsuarios = (req, res = response) => {
    const { nombre, dni } = req.body
    res.json({
        "mensaje": "ok postUsuarios",
        nombre,
        dni
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