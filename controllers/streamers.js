const { response, request } = require('express');
const bycrypt = require('bcryptjs');

const Streamer = require('../models/streamer');


const streamersGet = async(req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, streamers ] = await Promise.all([
      Streamer.countDocuments(query),
      Streamer.find(query)
          .skip( Number( desde ) )
          .limit(Number( limite ))
  ]);

  res.json({
      total,
      streamers
  });
}

  const streamerPost = async (req , res = response) => {


    const { nombre, email, password, rol, username} = req.body;
    const streamer = new Streamer({nombre, email, password, rol, username})

    // Ecriptar contraseña
    const salt = bycrypt.genSaltSync();
    streamer.password = bycrypt.hashSync(password, salt);

    // Guardar Usuario
    await streamer.save();

    res.json({
        streamer
    });
  }

  const streamerPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...resto} = req.body;

    if(password){
      const salt = bycrypt.genSaltSync();
      resto.password = bycrypt.hashSync(password, salt);
    }
    const streamer = await Streamer.findByIdAndUpdate(id, resto)

    res.json({
      streamer
  });
  }

  const streamerDelete = async (req, res = response) => {
    
    const { id } = req.params;

   // const usuario = await Usuario.FindByIdAndDelete (id);

   const streamer = await Streamer.findByIdAndUpdate( id, { estado: false });
    
    res.json (streamer)
  }
  module.exports = {
    streamerDelete,
    streamersGet,
    streamerPost,
    streamerPut
  }