const { response } = require("express");
const Usuario = require('../models/usuario');
const Streamer = require('../models/streamer')
const bycrypt = require('bcryptjs');
const { genJWT } = require("../helpers/jwt");


const login = async (req, res = response) => {

    const { email, password} = req.body;

    try {
        // Intentar encontrar el usuario en el modelo User
        const user = await Usuario.findOne({ email });

        // Si no se encuentra en el modelo User, intentar encontrar en el modelo Streamer
        const streamer = !user ? await Streamer.findOne({ email }) : null;

        // Verificar si encontramos un usuario en uno de los modelos
        if (!user && !streamer) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- Email'
            });
        }

        // Elegir el usuario correcto
        const usuario = user || streamer;

        // Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- Estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bycrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- Password'
            });
        }

        // Generar el JWT
        const token = await genJWT(usuario.id);

        // Crear una cookie con el token
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

const logout = (req, res = response) => {
    // Eliminar la cookie 'jwt' al hacer logout
    res.clearCookie('jwt');
    
    res.json({
        msg: 'Sesión cerrada con éxito'
    });
}


module.exports = {
    login,
    logout
}