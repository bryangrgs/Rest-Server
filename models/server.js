const express = require ('express')
const cors = require('cors');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath= '/api/usuarios';

        // Middlewares
        this.middlewares();
        //rutas de la aplicación
         this.routes();
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
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}
module.exports= Server;