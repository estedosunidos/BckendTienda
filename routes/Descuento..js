const express = require('express');
const router = express.Router();
const multiparty =require("../node_modules/connect-multiparty")
const patgh = multiparty({uploadDir:'./upload/descuentos/'})
var DescuentoControlle=require('../controller/DEscuentoControlle')
const auth=require("../middlewares/Authenticate")
router.post('/registro_descuento_admin',[auth.auth,patgh],DescuentoControlle.registro_descuento_admin)
router.get('/listar_descuento_admin/:filtro?',auth.auth,DescuentoControlle.listar_descuento_admin)
router.get('/obtener_banner/:img',DescuentoControlle.obtener_banner)
router.get('/obtener_descuento_admin/:id',auth.auth,DescuentoControlle.obtener_descuento_admin)
router.put('/updated_descuento_admin/:id',auth.auth,DescuentoControlle.updated_descuento_admin)
router.delete('/eliminar_descuento_Admin/:id',auth.auth,DescuentoControlle.eliminar_descuento_Admin)
router.get('/obtener_descuento_activo',DescuentoControlle.obtener_descuento_activo)
module.exports = router