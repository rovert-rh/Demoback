const jwt = require('jsonwebtoken')


const  genJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.KEY_SECURITY ,{
            expiresIn: '4h'
        }, (err , token) => {
                 
            if(err){
                console.log(err);
                reject("No se puede generar el token")
            }else{
                resolve(token);
            }
        }
        )

    })
}

module.exports = {
    genJWT
}