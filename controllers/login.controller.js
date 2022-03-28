const bcrypt = require('bcryptjs/dist/bcrypt');
const pool = require('../config/mySql');
const generateJWT = require("../middlewares/jwt");



async function login(req, res) {
  try {
    const { correo, contrasenya } = req.body;

    await pool.query("CALL SP_LOGIN1(?)", [correo], async (err, result) => {
     
        if (err) {
        console.log("Error de la base" + err);
        return;
      } else {
 

        let us = result[0];
        console.log(us)
        if( us.length == 0){
          return res.status(400).json({
            ok: false,
            msg: "Correo o contraseña incorrecto",
            
          });
        }

        let validPass = await bcrypt.compareSync(contrasenya, us[0]?.contrasenya);
        
        if (validPass) {
          const token = await generateJWT(us[0].correo);

          return res.status(200).json({
            ok: true,
            status: "Inicio de sesion exitoso",
            token,
          });
        } else {
          return res.status(400).json({
            ok: false,
            msg: "Correo o contraseña incorrecto",
            
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: "error ",
      error,
    });
  }
}

async function regnuevo(req, res) {
  let correo = req.body.correo;

  try {
    await pool.query("CALL SP_LOGIN(?)", [correo], async (error, result) => {
      let us = result[0];

      const token = await generateJWT(us[0].correo);

      return res.status(200).json({
        ok: true,
        user: us[0].correo,
        token,
      });
    });
  } catch (error) {}
}

module.exports = {
  login,
  regnuevo,
};
