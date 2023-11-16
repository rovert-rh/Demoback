const Role = require ('../models/role')
const { Usuario, Categoria, Membresia, Streamer} = require('../models');

const esRoleValidate = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol) {
        throw new Error(`el rol ${rol} no está registrado en la BD`)
    }
}
const existeEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
      throw new Error(`El correo: ${email} ya esta registrado`)
    }
}
const existeUserId = async ( id ) => {
    const existeUser = await Usuario.findById(id);
    if (!existeUser) {
      throw new Error(`El ID no existe: ${id}`)
    }
}
const existeStreamerId = async ( id ) => {
  const existeStreamer = await Streamer.findById(id);
  if (!existeStreamer) {
    throw new Error(`El ID no existe: ${id}`)
  }
}
const existeCategoriaId = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
      throw new Error(`El ID no existe: ${id}`)
    }
}
const existeMembresiaId = async ( id ) => {
  const existeMembresia = await Membresia.findById(id);
  if (!existeMembresia) {
    throw new Error(`El ID no existe: ${id}`)
  }
}
//Validad Colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones =[]) => {

  const incluida = colecciones.includes(coleccion);
  if(!incluida) {
    throw new Error (` La coleccion ${coleccion} no es permitida, ${colecciones}`);

   
  }
  return true;
}

module.exports = {
    esRoleValidate,
    existeEmail,
    existeUserId,
    existeCategoriaId,
    existeMembresiaId,
    existeStreamerId,
    coleccionesPermitidas
}