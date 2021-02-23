const jwt = require('jsonwebtoken')

const validarJWT = (req, res, next) => {

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

        console.log(uid);

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