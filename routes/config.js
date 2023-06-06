const express = require("express");
const cpnfigController=require("../controller/configController")
const router=express.Router();
const auth=require("../middlewares/Authenticate")
const multiparty =require("../node_modules/connect-multiparty")
const patgh = multiparty({uploadDir:'./upload/configuraciones/'})
//-----------Ruta de configuracion-------------------------------------//

router.put('/actualizar_config_admin/:id',[auth.auth,patgh],cpnfigController.actualizar_config_admin)
router.get('/obtener_config_admin',auth.auth,cpnfigController.obtener_config_admin)
router.get('/actualizar_logo__config_admin/:img',cpnfigController.obtener_logo)
router.get('/obtener_config_publico',cpnfigController.obterner_confi_publico)

module.exports = router
