const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Streamer = require('../models/streamer');

const streamerJWT = async (req = request, res = response, next) => {
    const token = req.header('api-key');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.KEY_SECURITY);

        // Leer el usuario que corresponde
        const usuario = await Streamer.findById(uid); // Usar el modelo Streamer
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la base de datos'
            });
        }
        // Verificar el estado del usuario
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario estado False'
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    streamerJWT
};
