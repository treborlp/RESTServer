const { response } = require("express");
const { subirArchivo } = require("../helpers")

const uploads = async(req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msj: 'No existe ningun archivo' });
    }

    try {
        const nombre = await subirArchivo(req.files, ['txt', 'md', 'csv'], 'textos');
        res.json({ nombre })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
    //Se llama el helper de la funcion subir archivos
}

const actualizarImagenCategoria = async(req, res) => {
    const { coleccion, id } = req.params;

    res.json({
        coleccion,
        id
    })

}
module.exports = { uploads, actualizarImagenCategoria }