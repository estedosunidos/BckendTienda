const express = require('express');
const router = express.Router();
const multiparty =require("../node_modules/connect-multiparty")
const patgh = multiparty({uploadDir:'./upload/productos/'})
const productocontroller=require("../controller/productController")
const auth=require("../middlewares/Authenticate")

//PRODUCTOS

router.post('/registro_producto_Admin',[auth.auth,patgh],productocontroller.registro_product_admin);
router.get('/listar_productos_admin/:filtro?',auth.auth,productocontroller.listar_producto_admin);
router.get('/obtener_portad/:img',productocontroller.obtener_portada);
router.get('/obtener_producto_admin/:id',auth.auth,productocontroller.obtener_producto_admin)
router.put('/updated_producto_admin/:id',[auth.auth,patgh],productocontroller.updated_producto_admin)
router.delete('/eliminar_producto_adimin/:id',auth.auth,productocontroller.eliminar_producto_Admin)
router.put('/updated_producto_variedades_admin/:id',auth.auth,productocontroller.updated_producto_variedades_admin)
router.put('/Add_Img_galeria_admin/:id',[auth.auth,patgh],productocontroller.Add_Img_galeria_admin)
router.put('/delete_Img_galeria_admin/:id',auth.auth,productocontroller.delete_Img_galeria_admin)

//INVENTARIOS
router.get('/listar_inventario_producto_admin/:id',auth.auth,productocontroller.listar_inventario_producto_Admin)
router.delete('/delete_inventario_prodcuto_Admin/:id',auth.auth,productocontroller.delete_inventario_prodcuto_Admin)
router.post('/registro_inventario_prodcuto_admin',auth.auth,productocontroller.registro_inventario_prodcuto_admin)

//Metodo publicos
router.get('/listar_producto_publico/:filtro?',productocontroller.listar_producto_publico )
router.get('/listar_productos_slug_publico/:slug',productocontroller.listar_productos_slug_publico)
router.get('/listar_producto_recomendado_publico/:categoria',productocontroller.listar_producto_recomendado_publico)
router.get('/listar_producto_recomendado_nuevo_publico',productocontroller.listar_producto_nuevo_publico)
router.get('/listar_producto_masventido_publico',productocontroller.listar_producto_masventido_publico)

module.exports = router

