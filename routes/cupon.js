const express = require('express');
const router = express.Router();
const productocontroller=require("../controller/cuponController")
const auth=require("../middlewares/Authenticate")

router.post('/resgistro_cupon_Admin',auth.auth,productocontroller.registro_cupon_admin)
router.get("/listarcupones/:filtro?",auth.auth,productocontroller.listar_cupones_Admin)
router.get('/obtener_cuponer_admin/:id',auth.auth,productocontroller.obtener_cuponer_admin)
router.put('/actualizar_cupones_Admin/:id',auth.auth,productocontroller.actualizar_cupones_Admin)
router.delete('/eliminar_cupones_adimin/:id',auth.auth,productocontroller.eliminar_cupones_admin)
module.exports = router