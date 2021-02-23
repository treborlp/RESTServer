const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generar-jwt");
const UsuarioSchema = require('../models/usuario');

const login = async(req, res) => {

    const { correo, password } = req.body;

    try {
        //varificar si el correo existe
        const usuario = await UsuarioSchema.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msj: "Error en el correo o password: correo"
            })
        }
        //verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msj: "Error en el correo o password: status"
            })
        }
        //comparar password
        const verificarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!verificarPassword) {
            return res.status(400).json({
                msj: "Error en el correo o password: password"
            })
        }

        //Generar JWToken
        const token = await generarJWT(usuario._id);

        res.json({
            msj: "Exito",
            correo,
            password,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            msj: "Error durante el proceso de login"
        })
    }

}

module.exports = login