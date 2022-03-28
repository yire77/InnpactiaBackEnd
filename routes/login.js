const {Router} = require('express');
const router = Router();

const { check } = require('express-validator');
const {validate} = require('../middlewares/validate');
const {login}= require('../controllers/login.controller');

router.post('/login',[
    check('correo','email is requiered').not().isEmpty(),
    check('contrasenya','password is requiered').not().isEmpty(),
    validate
    ], login);


module.exports = router;