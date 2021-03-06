const { response } = require("express");
const { v4: uuidv4 } = require('uuid');

const path = require('path');


const uploads = (req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msj: 'No existe ningun archivo' });
        return;
    }

    const { archivo } = req.files;
    const archivoSeparado = archivo.name.split('.');
    const extensionArchivo = archivoSeparado[archivoSeparado.length - 1]; //La extencion sel archivo se optiene mediante la ultima ubicacion del arreglo generado por split
    const extensionesPermitidas = ['jpg', 'png', 'jpeg', 'gif']

    if (!extensionesPermitidas.includes(extensionArchivo)) {
        res.status(400).json({ msj: 'No es un archivo valido' });
        return;
    }

    const nombreTemp = uuidv4() + '.' + extensionArchivo; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

    uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ err });
        }

        res.json('File uploaded to ' + uploadPath);
    });
}

module.exports = uploads