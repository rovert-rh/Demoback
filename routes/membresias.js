const { Router } = require(`express`);
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const { crearMembresia, obtenerMembresias, obtenerMembresia, actualizarMembresia, deleteMembresia } = require("../controllers/membresias");
const { existeMembresiaId } = require("../helpers/db-validators");

const router = Router();

//Obtener Categorias
router.get('/', obtenerMembresias);

//Obtener Categorias por id
router.get('/:id',[
    check('id','No es un id de Mongo Valido').isMongoId(),
   check('id').custom(existeMembresiaId),
   validarCampos
], obtenerMembresia);

//Crear categorias
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearMembresia);

//Actualizar categoria
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeMembresiaId ),
    validarCampos
], actualizarMembresia);

//Borrar una categoria
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeMembresiaId),
    validarCampos
], deleteMembresia);


module.exports = router;