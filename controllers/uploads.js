const { response } = require("express");
const path = require('path');


const uploads = (req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msj: 'No existe ningun archivo' });
        return;
    }

    const { archivo } = req.files;

    uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ err });
        }

        res.json('File uploaded to ' + uploadPath);
    });
}

module.exports = uploads