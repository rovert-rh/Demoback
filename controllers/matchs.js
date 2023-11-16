const { response } = require("express");
const Match = require('../models/match');

const registrarInformacionAdicional = async (req, res = response) => {
    const { usuario, membresia, categoria, horario, zonaH, ModoJuego, informacionAdicional } = req.body;
    
    try {
        // Crear un nuevo registro de Match con información adicional
        const match = new Match({
            usuario,
            membresia,
            categoria,
            horario,
            zonaH,
            ModoJuego,
        });
        
        await match.save();
        
        res.json({ msg: 'Información adicional registrada con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al registrar la información adicional' });
    }
}
const encontrarUsuariosSimilares = async (req, res = response) => {
    const { intereses } = req.body;

    try {
        // Buscar usuarios con intereses similares
        const usuariosSimilares = await Match.find({
            'informacionAdicional.intereses': { $in: intereses }
        }).populate('usuario'); // Usar populate para obtener la información del usuario
        
        res.json({ usuariosSimilares });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al buscar usuarios similares' });
    }
}
const encontrarEmparejamientos = async (req, res = response) => {
    const { membresia, categoria } = req.body;

    try {
        // Buscar emparejamientos que coincidan con la membresía y la categoría
        const emparejamientos = await Match.find({
            membresia: membresia,
            categoria: categoria,
        }).populate('usuario'); // Usar populate para obtener la información del usuario
        
        res.json({ emparejamientos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al buscar emparejamientos' });
    }
}

module.exports = {
    registrarInformacionAdicional,
    encontrarUsuariosSimilares,
    encontrarEmparejamientos

};
