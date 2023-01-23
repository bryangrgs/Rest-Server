const {response, request}=require ('express');


const usuarioGet= (req= request,res= response) => {
    const {q,nombre='undefined',apikey,page=1,limit}= req.query;
    //mandamos un objeto con json
    res.json({
        
        msg: 'get API- Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const usuarioPut= (req,res=response)=>{
    const {id} = req.params;
    //mandamos un objeto con json
    res.json({
        
        msg: 'put API- Controlador',
        id
    });
}
const usuarioPost=(req,res=response)=>{
    const {Nombre,edad} =req.body;
    //mandamos un objeto con json
    res.json({
        
        msg: 'post API- UsuarioPost',
        //desestructurando body como validación
       Nombre,
       edad
    });
}
const usuarioDelete=  (req,res=response)=>{
    //mandamos un objeto con json
    res.json({
        
        msg: 'delete API- Controlador'
    });
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