const express = require("express");
const carritoController=require("../controller/carritoController")
const router=express.Router();
const auth=require("../middlewares/Authenticate")

router.post('/agregar_Carrito_cliente',auth.auth,carritoController.agregar_Carrito_cliente);
router.get('/obtener_Carrito_cliente/:id',auth.auth,carritoController.obtener_Carrito_cliente)
router.delete('/eliminar_Carrito_cliente/:id',auth.auth,carritoController.eliminar_Carrito_cliente)
module.exports = router
