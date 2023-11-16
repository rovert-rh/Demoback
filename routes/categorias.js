const { Router } = require(`express`);
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, deleteCategoria } = require("../controllers/categorias");
const { existeCategoriaId } = require("../helpers/db-validators");

const router = Router();

//Obtener Categorias
router.get('/', obtenerCategorias);

//Obtener Categorias por id
router.get('/:id',[
    check('id','No es un id de Mongo Valido').isMongoId(),
   check('id').custom(existeCategoriaId),
   validarCampos
], obtenerCategoria);

//Crear categorias
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar categoria
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], actualizarCategoria);

//Borrar una categoria
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], deleteCategoria);


module.exports = router;