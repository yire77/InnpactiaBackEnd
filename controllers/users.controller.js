const pool = require('../config/mySql');

const encryptPassword = require('../helpers/passwordEncypter');


async function new_user (req, res){

    try {
        const user = req.correo;
        const {nombre,correo,genero,contrasenya} = req.body;
       

        let passwordEncrypt = await encryptPassword(contrasenya)

        await pool.query('CALL SP_NUEVO_USUARIO(?,?,?,?,?)',[nombre,correo,passwordEncrypt,genero,user], async (err, result)=> {
         
            if (err) {
                console.log('Error de la base' + err);
                return
                
                ;
                
            }else{
                console.log(result);
                return res.status(201).json({
                    status: 'registrado con exito' 
                });
            }

            });   

        
    } catch (error) {
        return res.status(500).json({
            status:'error ',
           error
        })
        
    }
    }
    


module.exports ={ new_user}