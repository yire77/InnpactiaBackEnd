const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const { validate } = require("../middlewares/validate");
const { new_user } = require("../controllers/users.controller");

router.post(
  '/new-usuario/',
  [
    check('nombre', 'name is required').not().isEmpty(),
    check('correo', 'name is required').not().isEmpty(),
    check('genero', 'name is required').not().isEmpty(),
    validate,
  ],new_user
);

module.exports = router;
