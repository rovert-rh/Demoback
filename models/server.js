const express = require('express')
const cors = require ("cors");
const { dbConnection } = require('../database/config');
const fileUpload = require("express-fileupload")

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            membresias: '/api/membresias',
            streamers: '/api/streamers',
            user:       '/api/user',
            uploads:    '/api/uploads'

        }

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares() {
        //cors
        this.app.use(cors({
            origin: 'http://127.0.0.1:5173',
            origin: 'https://bosterst.com'
        }));

        //Lectura y parseo del Body
        this.app.use(express.json())

        //Public
        this.app.use(express.static(`public`));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.path.auth , require('../routes/auth'));
        this.app.use(this.path.categorias , require('../routes/categorias'));
        this.app.use(this.path.membresias , require('../routes/membresias'));
        this.app.use(this.path.streamers , require('../routes/streamers'));
        this.app.use(this.path.user , require('../routes/user'));
        this.app.use(this.path.uploads , require('../routes/uploads'));
        };

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto`, this.port)
        })
    }
}

module.exports = Server;