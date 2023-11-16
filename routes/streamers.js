const { Router } = require(`express`);
const { check } = require("express-validator");

const { streamerDelete, streamerPost, streamersGet, streamerPut } = require("../controllers/streamers");

const {validarCampos, esAdminRole, streamerJWT} = require("../middlewares")

const { esRoleValidate, existeEmail, existeStreamerId } = require("../helpers/db-validators");



const router = Router();

    router.get('/', streamersGet);

    router.post('/', [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password debe tener al menos 5 caracteres').isLength({min:5}),
        check('email', 'el correo no es valido').isEmail(),
        check('email', 'el correo no es valido').custom(existeEmail),
        validarCampos
    ],streamerPost );

    router.put('/:id', [
        check('id', 'No es un ID Valido').isMongoId(),
        check('id').custom(existeStreamerId),
        validarCampos, 
        
    ], streamerPut);

    router.delete('/:id', [
        check('id', 'No es un ID Valido').isMongoId(),
        check('id').custom(existeStreamerId),
        validarCampos, 
    ], streamerDelete );




module.exports = router;