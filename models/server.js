const express = require('express')
const cors = require('cors')

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
        //Middlewar cors
        this.app.use(cors());
        //Middlewar carpeta public
        this.app.use(express.static('public'));
    }


    routes() {
        //Inicalizamos las rutas
        this.app.get('/api', (req, res) => {
            res.json({
                "mensaje": "ok"
            })
        })
        this.app.put('/api', (req, res) => {
            res.json({
                "mensaje": "ok"
            })
        })
        this.app.post('/api', (req, res) => {
            res.json({
                "mensaje": "ok"
            })
        })
        this.app.delete('/api', (req, res) => {
            res.json({
                "mensaje": "ok"
            })
        })
        this.app.patch('/api', (req, res) => {
            res.json({
                "mensaje": "ok"
            })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor Corriendo", this.port);
        })
    }

}
module.exports = Server;