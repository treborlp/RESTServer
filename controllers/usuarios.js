const { response } = require('express')

getUsuarios = (req, res = response) => {
    res.json({
        "mensaje": "ok getUsuarios"
    })
}

postUsuarios = (req, res = response) => {
    res.json({
        "mensaje": "ok postUsuarios"
    })
}

putUsuarios = (req, res = response) => {
    res.json({
        "mensaje": "ok putUsuarios"
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