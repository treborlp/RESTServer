const { response } = require("express");
const CategoriaSchema = require("../models/categoria")


// obtenerCategorias - Paginado - Total - populate

const obtenerCategorias = async(req, res = response) => {
    //obtetemos el limite e inicio de la paginacion
    const { limite = 5, desde = 0 } = req.query;

    //Realizamos la peticion a la base de datos
    const [categorias, total] = await Promise.all([
        CategoriaSchema.find().skip(Number(desde)).limit(Number(limite)).populate("usuario"),
        CategoriaSchema.countDocuments() //Obtiene el número total de registros
    ]);

    //Respuesta 
    res.status(200).json({
        categorias,
        total
    })
}

//Obtener una categoria
const obtenerCategoriaUnica = async(req, res = response) => {
    const { id } = req.params;
    const categoriaBD = await CategoriaSchema.findById(id).populate('usuario');
    res.status(200).json(categoriaBD)
}


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
    //Actualizar categoria
const actualizarCategoria = async(req, res = response) => {
    //Obtengo la categoria
    const { nombre } = req.body;
    //Obtenemos el id de los parametros
    const { id } = req.params;

    try {
        const actualizado = await CategoriaSchema.findByIdAndUpdate(id, { nombre });
        res.status(200).json({
            msj: "categoria actualizada"
        });
    } catch (error) {
        return res.status(501).json({
            msj: "Se encontro un error durante la insercion"
        })
    }


}

//Borrar Categoria - estado:false
const eliminarCategoria = async(req, res) => {
    //Obtenemos el id de la request
    const { id } = req.params;
    try {
        await CategoriaSchema.findOneAndUpdate(id, { estado: false })
        res.status(200).json({
            msj: "categoria actualizada"
        });
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            msj: "No se pudo eliminar"
        })
    }

}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaUnica,
    actualizarCategoria,
    eliminarCategoria
}