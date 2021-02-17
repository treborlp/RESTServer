const express = require('express')

class Server {

    constructor() {
        //Inicializamos express
        this.app = express();
        this.port = process.env.PORT

        //Middleware
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'));
    }


    routes() {
        //Inicalizamos las rutas
        this.app.get('/api', (req, res) => {
            res.send('Hello World')
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor Corriendo", this.port);
        })
    }

}
module.exports = Server;