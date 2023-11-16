const { Router } = require(`express`);
const { check } = require("express-validator");

const { userGet, userPost, userPut, userDelete } = require("../controllers/user");

const {validarCampos, validarJWT , esAdminRole} = require("../middlewares")

const { esRoleValidate, existeEmail, existeUserId } = require("../helpers/db-validators");



const router = Router();

    router.get('/', userGet);

    router.post('/', [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password debe tener al menos 5 caracteres').isLength({min:5}),
        check('email', 'el correo no es valido').isEmail(),
        check('email', 'el correo no es valido').custom(existeEmail),
        validarCampos
    ],userPost );

    router.put('/:id', [
        check('id', 'No es un ID Valido').isMongoId(),
        check('id').custom(existeUserId),
        validarCampos, 
        
    ], userPut);

    router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID Valido').isMongoId(),
        check('id').custom(existeUserId),
        validarCampos, 
    ], userDelete );




module.exports = router;