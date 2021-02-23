const jwt = require('jsonwebtoken')
const UsuarioSchema = require('../models/usuario');

const validarJWT = async(req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msj: "No existe token"
        })
    }
    try {
        const vericarToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY) // verificarToken tiene la forma: { uid: '6034712ef1f94a26a8e79b9b', iat: 1614085500, exp: 1614099900 }

        //Extremos el token
        const { uid } = vericarToken;

        //Extraemos el usuario del token
        const usuarioToken = await UsuarioSchema.findById(uid);

        if (!usuarioToken) {
            return res.status(400).json({
                msj: "El usuario no existe"
            })
        }

        if (!usuarioToken.estado) {
            return res.status(401).json({
                msj: "El usuario no esta autorizado"
            })
        }

        //Asiganamos a la respuesta el usuario autentificado
        req.usuarioAutentificado = usuarioToken;


    } catch (error) {
        console.log(error);
        res.status(401).json({
            msj: "Token invalido"
        })
    }

    //console.log(vericarToken);
    next()
}

module.exports = validarJWT;