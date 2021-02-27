const { response } = require("express");
const CategoriaSchema = require("../models/categoria")

const crearCategoria = async(req, res = response) => {
    //Obtenemos la categoria del body
    const nombre = req.body.nombre.toUpperCase();

    //Buscamos categorias repetidas
    const categoriaBD = await CategoriaSchema.findOne({ nombre });

    if (categoriaBD) {
        return res.status(401).json({
            msj: `La categoria: ${categoriaBD.nombre} ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuarioAutentificado._id
    }

    const categoria = new CategoriaSchema(data);
    await categoria.save(); // Guardamos la categoria

    res.status(200).json({
        msj: "Categoria creada",
        categoria
    })

}

module.exports = {
    crearCategoria
}