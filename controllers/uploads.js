const path = require("path")
const fs = require("fs")
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const { uploadFiles } = require("../helpers");
const {Usuario, Streamer } = require("../models/")


const cargarArchivos = async (req, res= response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json('No hay archivos en la peticion.');
    return;
  }
  const Nombre = await uploadFiles (req.files);
  res.json({Nombre})
}

const updateImg = async(req, res = response) => {

  const { id, coleccion } = req.params; 


  let modelo;
  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`No existe un usuario con el id ${ id }`
          });
        }
      break;

      case 'streamers':
        modelo = await Streamer.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`No existe el streamer con el id ${ id }`
          });
        }
      break;
  
    default:
        return res.status(500).json({msg: 'Se me olvido validar esto'})
  }

  // Limpiar Server
  if (modelo.img){

    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImagen)){
      fs.unlinkSync(pathImagen);
    }
  }


  const nombre = await uploadFiles(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo)
}

const mostrarImg = async (req, res=response) => {
  const { id, coleccion } = req.params; 


  let modelo;
  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`No existe un usuario con el id ${ id }`
          });
        }
      break;

      case 'streamers':
        modelo = await Streamer.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`No existe el streamer con el id ${ id }`
          });
        }
      break;
  
    default:
        return res.status(500).json({msg: 'Se me olvidfo validar esto get'})
  }

  // Limpiar Server
  if (modelo.img){

    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImagen)){
        return res.sendFile (pathImagen)
    }
  }
    const pathImagen = path.join(__dirname, '../assets(no-image.jpg');
    res.sendFile(pathImagen)
}

const updateImgCloud = async(req, res = response) => {

  const { id, coleccion } = req.params; 


  let modelo;

  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`No existe un usuario con el id ${ id }`
          });
        }
      break;

      case 'streamers':
        modelo = await Streamer.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg:`No existe el streamer con el id ${ id }`
          });
        }
      break;
    default:
        return res.status(500).json({msg: 'Se me olvido validar esto'})
  }
 // Limpiar Server
 if (modelo.img) {
  const nombreArr = modelo.img.split('/');
  const nombre = nombreArr[nombreArr.length - 1];
  const public_id = nombre.split('.')[0];

  // Elimina la imagen de Cloudinary
  const resultado = await cloudinary.uploader.destroy(public_id);
}

const { tempFilePath } = req.files.archivo;

// Crea la carpeta en Cloudinary con el nombre de la colección
const folder = coleccion;
const uploadOptions = { folder };
const { secure_url } = await cloudinary.uploader.upload(tempFilePath, uploadOptions);

modelo.img = secure_url;

await modelo.save();

res.json(modelo);
};
const mostrarImgCloud = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }
      break;

    case 'streamers':
      modelo = await Streamer.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el streamer con el id ${id}`
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto en el GET' });
  }

  // Verificar si el modelo tiene una imagen
  if (modelo.img) {
    // Devolver la URL de la imagen almacenada en Cloudinary
    return res.json({ img: modelo.img });
  }
  const pathImagen = path.join(__dirname, '../assets(no-image.jpg');
    res.sendFile(pathImagen)
};
const cargarArchivoCloud = async (req, res = response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json('No hay archivos en la petición.');
      return;
    }

    const { id, coleccion } = req.params; 

    let modelo;

    switch (coleccion) {
      case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
          });
        }
        break;

      case 'streamers':
        modelo = await Streamer.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe el streamer con el id ${id}`
          });
        }
        break;

      default:
        return res.status(500).json({ msg: 'Se me olvidó validar esto en cargarArchivos' });
    }

    // Limpiar Server
    if (modelo.img) {
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const public_id = nombre.split('.')[0];

      // Elimina la imagen anterior de Cloudinary
      await cloudinary.uploader.destroy(public_id);
    }

    // Carga el nuevo archivo a Cloudinary en la carpeta de la colección
    const { tempFilePath } = req.files.archivo;
    const folder = coleccion;
    const uploadOptions = { folder };
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, uploadOptions);

    modelo.img = secure_url;
    await modelo.save();

    res.json({ msg: 'Archivo cargado exitosamente', img: secure_url });
  } catch (error) {
    console.error('Error al cargar el archivo:', error);
    res.status(500).json({ msg: 'Error al cargar el archivo' });
  }
};





module.exports = {
    cargarArchivos,
    updateImg,
    mostrarImg,
    updateImgCloud,
    mostrarImgCloud,
    cargarArchivoCloud
}