
const Role = require ('../models/role');
const {Usuario,Categoria,Producto} = require('../models');
//validators utiles || configuraciones personalizadas
const esRolValido = async(rol='') =>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
}
const emailExiste=async( correo= '')=>{
    //verificar si el correo existe
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo: ${correo}, ya esta registrado`);

    }
}
const existeUsuarioPorId = async (id)=> {
    const existeUsuario= await  Usuario.findById(id);
    if(!existeUsuario){
        throw new Error (`El id no existe: ${id}`);
    }

}
// Validadores personalizados de categorias
const existeCategoriaPorId= async (id)=>{
    const existeCategoria= await  Categoria.findById(id);
    if(!existeCategoria){
        throw new Error (`El id no existe: ${id}`);
    }
}
const existeProductoPorId= async (id)=>{
    const existeProducto= await  Producto.findById(id);
    if(!existeProducto){
        throw new Error (`El id no existe: ${id}`);
    }
}
module.exports ={
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}