const { response } = require("express");
const { Membresia } = require("../models");

const obtenerMembresias = async (req, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { disponible: true };

  const [ total, membresias ] = await Promise.all([
      Membresia.countDocuments(query),
      Membresia.find(query)
      .populate('usuario', 'nombre')
          .skip( Number( desde ) )
          .limit(Number( limite ))
  ]);

  res.json({
      total,
      membresias
  });

}
const obtenerMembresia = async (req, res = response) => {
    
   const {id} = req.params;
   const membresia = await Membresia.findById (id).populate('usuario');

   res.json (membresia);

}
const crearMembresia = async (req, res = response) => {

    const { usuario , ...body } = req.body;
    const nombre = req.body.nombre;
    const membresiaDB = await Membresia.findOne({ nombre })

    if(membresiaDB) {
        return res.status(400).json({
            msg:`La categoria ${membresiaDB.nombre}, ya existe`
        });
    }
    const data = {
        ...body,
        nombre, 
        usuario: req.usuario._id
       
    }
    const membresia = new Membresia (data);
    await membresia.save();

    res.status(201).json(membresia);
}

const actualizarMembresia = async (req, res = response) => {

    const {id} = req.params;
    const { usuario, ...data} = req.body;

    data.nombre = data.nombre();
    data.usuario = req.usuario._id;

    const membresia = await Membresia.findByIdAndUpdate(id, data, {new: true});

    res.json(membresia)
}

const deleteMembresia = async (req, res = response) => {
    
    const { id } = req.params;
    const membresia = await Membresia.findByIdAndUpdate( id, { disponible: false });
    
    res.json (membresia)
  }

module.exports = {
    crearMembresia,
    obtenerMembresia,
    obtenerMembresias,
    actualizarMembresia,
    deleteMembresia
}