const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const categoria = require("../models/categoria");
const producto = require("../models/producto");
const usuario = require("../models/usuario");

const uploads = async(req, res = response) => {


    // Esta validación de archivo se realiza a traves del midelware validarExisteArchivoImagen
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     return res.status(400).json({ msj: 'No existe ningun archivo' });
    // }

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

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await usuario.findById(id);
            if (!modelo) {
                return res.status(401).json({
                    msj: 'El modelo no existe'
                })
            }
            break;

        case 'productos':
            modelo = await producto.findById(id);
            if (!modelo) {
                return res.status(401).json({
                    msj: 'El producto no existe'
                })
            }
            break;
        default:
            return res.status(501).json({
                msj: 'Error interno en el servidor'
            })
    }

    //Borrar imagen anterios si existe
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img); //Direccion de la imagen fisica
        if (fs.existsSync(pathImagen)) { //Verificamos si existe la imagen
            fs.unlinkSync(pathImagen); //Eliminamos la imagen antigua
        }
    }

    //Asignamos el nombre de la iamgen al modelo
    modelo.img = await subirArchivo(req.files, undefined, coleccion);

    await modelo.save();

    res.json(modelo)

}

const obtenerImagen = async(req, res) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await usuario.findById(id);
            if (!modelo) {
                return res.status(401).json({
                    msj: 'El modelo no existe'
                })
            }
            break;

        case 'productos':
            modelo = await producto.findById(id);
            if (!modelo) {
                return res.status(401).json({
                    msj: 'El producto no existe'
                })
            }
            break;
        default:
            return res.status(501).json({
                msj: 'Error interno en el servidor'
            })
    }

    //Borrar imagen anterios si existe
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img); //Direccion de la imagen fisica
        if (fs.existsSync(pathImagen)) { //Verificamos si existe la imagen
            res.sendFile(pathImagen) //Enviamos la imagen
        }
    } else {
        res.json({
            msj: 'El usuario no tiene imagen'
        })
    }


}
module.exports = { uploads, actualizarImagenCategoria, obtenerImagen }