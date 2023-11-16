const { response, request } = require('express');
const bycrypt = require('bcryptjs');

const Usuario = require('../models/usuario');


const userGet = async(req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, usuarios ] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
          .skip( Number( desde ) )
          .limit(Number( limite ))
  ]);

  res.json({
      total,
      usuarios
  });
}

  const userPost = async (req , res = response) => {


    const { nombre, apellido, email, password, username, rol} = req.body;
    const usuario = new Usuario({nombre, email, password, rol, apellido, username})

    // Ecriptar contraseña
    const salt = bycrypt.genSaltSync();
    usuario.password = bycrypt.hashSync(password, salt);

    // Guardar Usuario
    await usuario.save();

    res.json({
        usuario
    });
  }

  const userPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...resto} = req.body;

    if(password){
      const salt = bycrypt.genSaltSync();
      resto.password = bycrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
      usuario
  });
  }

  const userDelete = async (req, res = response) => {
    
    const { id } = req.params;

   // const usuario = await Usuario.FindByIdAndDelete (id);

   const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    
    res.json (usuario)
  }
  module.exports = {
    userGet,
    userDelete,
    userPost,
    userPut
  }