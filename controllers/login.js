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
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            msj: "Error durante el proceso de login"
        })
    }

}

const loginGoogle = (req, res) => {
    const { id_token } = req.body;

    res.status(200).json({
        msj: "Token Encontrado",
        id_token
    })
}


module.exports = { login, loginGoogle }