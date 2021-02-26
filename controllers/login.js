const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/generar-jwt");
const validarLoginGoogle = require("../helpers/google-verify");
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

const loginGoogle = async(req, res) => {
    const { id_token } = req.body;

    try {
        const { nombre, correo, img } = await validarLoginGoogle(id_token);

        const usuarioExiste = await UsuarioSchema.findOne({ correo });

        if (!usuarioExiste) {
            const data = {
                nombre,
                correo,
                img,
                google: true,
                password: "xD"
            }
            const crearUsuario = new UsuarioSchema(data);
            await crearUsuario.save();
        }

        if (usuarioExiste.estado === false) {
            res.status(400).json({
                msj: "Usuario Bloqueado"
            })
        }


        //Guardamos en la base de datos

        res.status(200).json({
            msj: "Usuario Creado"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msj: "Error con la validacion de google"
        })

    }

}



module.exports = { login, loginGoogle }