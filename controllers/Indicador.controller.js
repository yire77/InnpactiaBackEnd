
const pool = require('../config/mySql');

async function new_indicador(req,res){
    
        try {
           
            const {in_nombre_indicador,in_us} = req.body;
          

            await pool.query('CALL SP_NUEVO_INDICADOR(?,?);',[in_nombre_indicador,in_us],async (err,result)=>{

                if (err) {
                    console.log('Error de la base' + err);
                    return;
                    
                
                    
                }
                   console.log(result);
                  
                    return res.status(201).json({
                        status: 'Indicador registrado con exito' 
                    });
                
                    
            })

        } catch (error) {
            return res.status(500).json({
                status:'error ',
               error
            })
        }

}


async function datos_indicador(req,res){

   

    try {
        const {id_indicador,descripcion,total,fecha,us} = req.body;

        await pool.query('CALL SP_DATO_INDICADOR(?,?,?,?,?)',[id_indicador,descripcion,total,fecha,us], async(err,result)=>{

            if (err) {
                console.log('Error de la base' + err);
                return
                
                ;
                
            }else{
                console.log(result);
                return res.status(201).json({
                    status: 'Datos del indicador registrado con exito' 
                });
            }

        })

    } catch (error) {
        return res.status(500).json({
            status:'error ',
           error
        })
    }



}

async function select_indicador(req,res){

    try {

        const id = req.params.id;

        await pool.query('CALL SP_SELECT_INDICADOR(?)',[id], async (err,result)=>{

            if (err) {
                console.log(err)
                return
            }

            return res.status(200).json({
                status: 'OK',
                result
            
            });
        });;
        
    } catch (error) {
        
        return res.status(500).json({
            status: ' error',
            error
        })

    }
}



async function editar_nameindicador (req,res){

try {
    const {id,nombre} = req.body;

    await pool.query('CALL SP_EDITAR_INDICADOR(?,?)',[id,nombre], async(err,result)=>{

        if (err) {
            console.log('error de la base'),
            err
            
        };

            return res.status(200).json({
                status: 'El nombre indicador se edito correctamente',
                result
            });

    });

    
} catch (error) {
    return res.status(500).json({
        status: 'error',
        error
    });
}

}


async function eliminar_indicador (req,res){

    try {
        
        const id = req.params.id;

        await pool.query('CALL SP_ELIMINAR_INDICADOR(?)',[id], async(err,result)=>{

            if (err) {
                console.log('error de la base'),
                err
                
            };

                return res.status(200).json({
                    status: 'El indicador se elimino correctamente',
                    result
                });

        });

    } catch (error) {
        
        return res.status(500).json({
            status: 'error',
            error
        });
    }
    
}


async function editar_datosindicador (req,res){

    try {
        const {id,descripcion,total,fecha} = req.body;
    
        await pool.query('CALL SP_EDITAR_DATO_INDICADOR(?,?,?,?)',[id,descripcion,total,fecha], async(err,result)=>{
    
            if (err) {
                console.log(err),
                err
                
            };
    
                return res.status(200).json({
                    status: 'El dato indicador se edito correctamente',
                    result
                });
    
        });
    
        
    } catch (error) {
        
    }
    
    }


    async function select_datosindicador (req,res){

        try {
            const id = req.params.id;
        
            await pool.query('CALL SP_SELECT_DATO_INDICADOR(?)',[id], async(err,result)=>{
        
                if (err) {
                    console.log('error de la base'),
                    err
                    
                };
        
                    return res.status(200).json({
                        status: 'OK',
                        result
                    });
        
            });
        
            
        } catch (error) {
            
        }
        
        }
    



module.exports ={ new_indicador,
    datos_indicador,
eliminar_indicador,
editar_nameindicador,
select_indicador,
select_datosindicador,
editar_datosindicador}

