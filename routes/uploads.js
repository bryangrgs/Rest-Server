const {Router}= require ('express');
const { check } = require('express-validator');
const { cargarArhivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos,validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/',validarArchivoSubir,cargarArhivo);
router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas (c,['usuarios','productos'])),
    validarCampos
],actualizarImagen)
router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas (c,['usuarios','productos'])),
    validarCampos
],mostrarImagen)


module.exports= router;