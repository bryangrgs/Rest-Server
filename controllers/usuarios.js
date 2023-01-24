const {response, request}=require ('express');
const Usuario = require('../models/usuario');
const bcryptjs= require('bcryptjs');


const usuarioGet= async (req= request,res= response) => {

    const{ limite = 5, desde= 0}= req.query;
    const query= {estado: true}

    const [total,usuarios] = await  Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    //mandamos un objeto con json
    res.json({
         total,
        usuarios
       
    });
}
const usuarioPut= async (req,res=response)=>{
    const {id} = req.params;
    const {_id,password, google,correo, ...resto}= req.body;
    //  TODO validar contra base de datos
    if( password){
            //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    //mandamos un objeto con json
    res.json(usuario);
}
const  usuarioPost =  async(req,res=response)=>{
   
    const {nombre,correo,password,rol} =req.body;
    const usuario= new Usuario({nombre,correo,password,rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    //guardar en BD
    await usuario.save();
    //mandamos un objeto con json
    res.json({
        
        msg: 'post API- UsuarioPost',
        //desestructurando body como validación
       usuario
    });
}
const usuarioDelete= async (req,res=response)=>{
    const {id}= req.params;
    //fisicamente lo borramos 
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{ estado: false });
    res.json({usuario});
}
const usuarioPatch=(req,res=response)=>{
    //mandamos un objeto con json
    res.json({
        
        msg: 'patch API- Controlador'
    });
}
module.exports={
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}