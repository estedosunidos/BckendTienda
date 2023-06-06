const express = require("express");
const admincontroller=require("../controller/AdminController")
const router=express.Router();

router.post("/registroAdmin",admincontroller.registro_Admin)
router.post("/login_Admin",admincontroller.login_admin)

module.exports = router

