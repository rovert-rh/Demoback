const validarCampos = require("./validator");
const validarJWT= require("./validator-jwt");
const esAdminRole = require("./validar-roles");
const streamerJWT = require("./validator-st");
const validarArchivo = require("./validad-archivos")

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdminRole,
    ...streamerJWT,
    ...validarArchivo
}