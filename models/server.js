const express = require ('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths ={
            auth:'/api/auth',
            buscar: '/api/buscar',
            categorias:'/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/usuarios',
            uploads: '/api/uploads'
            
        }
     
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
        this.app.use(express.static('public'));
        //FileUpload - carga de archivo
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes(){
        // es como un middleware condicional
        this.app.use(this.paths.auth ,require('../routes/auth'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.usuarios,require('../routes/usuarios'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.uploads,require('../routes/uploads'));
        
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}
module.exports= Server;