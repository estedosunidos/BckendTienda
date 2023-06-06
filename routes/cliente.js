const express = require("express");
const clientecontroller=require("../controller/clientecontroller")
const router=express.Router();
const auth=require("../middlewares/Authenticate")

router.post("/login_cliente",clientecontroller.login_cliente)
router.get("/listarcliente/:tipo/:filtro",auth.auth,clientecontroller.listarclientes)
router.post("/registrecustomer",auth.auth,clientecontroller.registro_cliente_admin)
router.get('/obtener_cliente_Admin/:id',auth.auth,clientecontroller.obtener_cliente_admin)
router.put('/actualizar_cliente_Admin/:id',auth.auth,clientecontroller.actualizar_cliente_Admin)
router.delete('/eliminar_cliente_adimin/:id',auth.auth,clientecontroller.eliminar_cliente_Admin)
router.get('/obtener_cliente_guest/:id',auth.auth,clientecontroller.obtener_cliente_guest)
router.put('/actualizar_cliente_guest/:id',auth.auth,clientecontroller.actualizar_cliente_guest)

router.post('/registro_direcciones_cliente',auth.auth,clientecontroller.registro_direcciones_cliente)
router.get('/obtener_direcciones_cliente/:id',auth.auth,clientecontroller.obtener_direcciones_cliente)
//router.put('/cambiar_direcciones_principal__cliente/:id/:cliente',auth.auth,clientecontroller.cambiar_direcciones_principal__cliente)
module.exports = router

