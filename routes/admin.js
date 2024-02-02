const express = require("express");
const admincontroller=require("../controller/AdminController");
const  auth  = require("../middlewares/Authenticate");
const router=express.Router();

router.post("/registroAdmin",admincontroller.registro_Admin)
router.post("/login_Admin",admincontroller.login_admin)
router.get('/obtener_mensaje',admincontroller.obtener_mensaje)
router.put('/cerra_mensaje_admin/:id',admincontroller.cerra_mensaje_admin)

module.exports = router

