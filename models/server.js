const express = require ('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath= '/api/usuarios';
        this.authPath= '/api/auth';
        //conectar a la base de datos (mongo)
        this.conectarDB();

        // Middlewares
        this.middlewares();
        //rutas de la aplicación
         this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
        // es como un middleware condicional
        this.app.use(this.authPath ,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}
module.exports= Server;