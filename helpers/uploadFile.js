const { response } = require('express');
const path = require('path')
const {v4: uuidv4} = require ('uuid')




const uploadFiles = (files, extensionValida = ['png','jpg','jpeg'], carpeta = '' ) => {
    return new Promise (( resolve, reject)=> {
        
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado [nombreCortado.length -1];
      
        // Validar Extension
        if(!extensionValida.includes(extension)){
           return reject(`La extension ${extension} no es permitida, ${extensionValida}`);
        }


      const nameTemp = uuidv4() + '.' + extension;
      const uploadPath = path.join ( __dirname, '../uploads/', carpeta, nameTemp);
      
      archivo.mv(uploadPath,(err) => {
          if (err) {
            reject(err)
          }
            resolve (nameTemp)
       });
      
    })
}



module.exports = {
    uploadFiles
    
}

