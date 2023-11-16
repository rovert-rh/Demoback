const { request, response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models');


const validarJWT =  async (req = request, res = response, next) => {
    const token = req.header('api-key');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
    const {uid} = jwt.verify(token, process.env.KEY_SECURITY);

    //leer el usuario que correponde
    const usuario = await Usuario.findById(uid)
    if(!usuario) {
        return res.status(401).json({
            msg: 'Token no valido - usuario no existe en DB'
        })
    }
    //Verificar status del uid
    if(!usuario.estado) {
        return res.status(401).json({
            msg: 'Token no valido - Usuario estado False'
        })
    }

    req.usuario = usuario;

    next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}