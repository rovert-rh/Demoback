const { Router } = require(`express`);
const { check } = require("express-validator");
const { validarCampos , validarArchivo } = require("../middlewares");
const { cargarArchivos, updateImg, mostrarImg, updateImgCloud, mostrarImgCloud, cargarArchivoCloud } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { usuarios } = require("../models");


const router = Router();

router.post('/:coleccion/:id',[
    validarArchivo,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['usuarios', 'streamers' ] ) ),
    validarCampos
], cargarArchivoCloud);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['usuarios', 'streamers' ] ) ),
    validarCampos
], updateImgCloud);

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['usuarios', 'streamers' ] ) ),
    validarCampos
], mostrarImgCloud);


module.exports = router;