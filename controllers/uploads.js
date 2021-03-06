const { response } = require("express");
const { subirArchivo } = require("../helpers")

const uploads = async(req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msj: 'No existe ningun archivo' });
        return;
    }

    //Se llama el helper de la funcion subir archivos
    const nombre = await subirArchivo(req.files);
    res.json({ nombre })


}

module.exports = uploads