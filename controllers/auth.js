const { response } = require("express");
const Usuario = require('../models/usuario');
const bycrypt = require('bcryptjs');
const { genJWT } = require("../helpers/jwt");


const login = async (req, res = response) => {

    const { email, password} = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email})
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- Email'
            })
        }
        // Verificar si esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- Estado: false'
            })
        }
        // Verificar la contraseña
        const validPassword = bycrypt.compareSync ( password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -- Password'
            })
        }

        // Generar el JWT
        const token = await genJWT(usuario.id);

       // Crear una cookie con el token
       res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    res.json({
        usuario,
        token
    });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }

   
}

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