const bcrypt = require('bcryptjs');



const salt = bcrypt.genSaltSync(10);


const encryptPassword = (contrasenya)=>{
    
    return new Promise((resolve,reject)=>{

        const hash = bcrypt.hashSync(contrasenya, salt);
        resolve(hash);
    })


}

module.exports =encryptPassword;