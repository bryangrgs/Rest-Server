
//Router
const {Router}= require ('express');
const { check } = require('express-validator');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {validarCampos,validarJWT,esAdminRole,tieneRole}= require('../middlewares');

const {usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch}= require('../controllers/usuarios');
const router = Router();

router.get('/', usuarioGet);

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos

],usuarioPut);

router.post('/',[
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de mas de 6 letras').isLength({min: 6}),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usuarioPost  );

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE','OTRO_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuarioDelete);

router.patch('/',usuarioPatch  );

module.exports=router;