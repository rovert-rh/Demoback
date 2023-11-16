const {response} = require ('express')

const esAdminRole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_R') {
        return res.status(401).json({
            msg: `${ nombre} no es administrador - No puede realizar esta accion`
        })
    }
    next()

}
module.exports = {
    esAdminRole
}