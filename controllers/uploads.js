const { response } = require("express");


const uploads = (req, res = response) => {
    res.status(200).json({
        msj: "Hola todo bien"
    })
}

module.exports = uploads