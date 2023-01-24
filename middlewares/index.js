const validaCampos= require ('../middlewares/validar-campos.js');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports={
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}