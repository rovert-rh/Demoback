const express = require("express");
const router = express.Router();
const {
  registrarInformacionAdicional,
  encontrarUsuariosSimilares,
  encontrarEmparejamientos,
} = require("./tuControlador");


router.post("/registrarInformacionAdicional", registrarInformacionAdicional);


router.post("/encontrarUsuariosSimilares", encontrarUsuariosSimilares);


router.post("/encontrarEmparejamientos", encontrarEmparejamientos);

module.exports = router;
