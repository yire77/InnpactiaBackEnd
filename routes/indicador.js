const { Router } = require("express");
const router = Router();


const indicadorController= require("../controllers/Indicador.controller");

router.post( '/add-indicador', indicadorController.new_indicador );
router.post('/dato-indicador', indicadorController.datos_indicador);
router.delete('/delete-indicador/:id', indicadorController.eliminar_indicador);
router.put('/update-indicador', indicadorController.editar_nameindicador);
router.get('/select-indicador/:id', indicadorController.select_indicador);
router.get('/select-datos-indicador/:id', indicadorController.select_datosindicador);
router.put('/update-datos-indicador', indicadorController.editar_datosindicador);
module.exports = router;
    