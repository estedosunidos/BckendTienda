const cliente = require("../models/cliente");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helper/jwt");
const { hash } = require("bcrypt");
var dirreccion = require('../models/dirrecciones');
//------------------------------------------------------------------------------//
const login_cliente = async function (req, res) {
  var data = req.body;
  var cliente_arr = [];
  cliente_arr = await cliente.find({ email: data.email });
  if (cliente_arr.length === 0) {
    res
      .status(200)
      .send({ message: "No se encontro el correo", data: undefined });
  } else {
    let user = cliente_arr[0];
    bcrypt.compare(data.passworld, user.password, async function (err, check) {
      if (!check) {
        res.status(200).send({ data: user, token: jwt.createToken(user) });
      } else {
        res.status(403).send({ message: "No es igual la contraseña" });
      }
    });
  }
};
//------------------------------------------------------------------------------------//
const listarclientes = async function (req, res) {
  let tipo = req.params["tipo"];
  let filtro = req.params["filtro"];
  if (tipo == null || tipo == "null") {
    let registro = await cliente.find();
    res.status(200).send({ data: registro });
  } else {
    if (tipo == "apellido") {
      let registro = await cliente.find({
        apellido: new RegExp(filtro, "i"),
      });
      res.status(200).send({ data: registro });
    } else if (tipo == "email") {
      let registro = await cliente.find({ emal: new RegExp(filtro, "i") });
      res.status(200).send({ data: registro });
    }
  }
};
//-----------------------------------------------------------------------------------//
const registro_cliente_admin = async function (req, res) {
  var data = req.body;
  var resp = await cliente.create(data);
  res.status(200).send({ data: resp });
};
//----------------------------------------------------------------------------------//
const obtener_cliente_admin = async function (req, res) {
  var id = req.params["id"];
  try {
    var rag = await cliente.findById({ _id: id });
    res.status(200).send({ data: rag });
  } catch (error) {
    res.status(500).send({ data: undefined });
  }
};
//---------------------------------------------------------------------------------------//
const actualizar_cliente_Admin = async function (req, res) {
  var id = req.params["id"];
  var data = req.body;
  var reg = await cliente.findByIdAndUpdate(
    { _id: id },
    {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      f_nacimiento: data.f_nacimiento,
      genero: data.genero,
      cedula: data.cedula,
    }
  );
  res.status(200).send({ data: reg });
};
//--------------------------------------------------------------------------------//
const eliminar_cliente_Admin = async function (req, res) {
  var id = req.params["id"];
  let reg = await cliente.findByIdAndRemove({ _id: id });
  res.status(200).send({ data: reg });
};
const obtener_cliente_guest = async function (req, res) {
    var id = req.params["id"];
    try {
      var rag = await cliente.findById({ _id: id });
      res.status(200).send({ data: rag });
    } catch (error) {
      res.status(500).send({ data: undefined });
    }
  }
  const actualizar_cliente_guest = async function (req, res) {
    var id = req.params["id"];
    var data= req.body
    if(data.password) {
      bcrypt.hash(data.password,null,null,async function(err,has){
        var reg = await cliente.findByIdAndUpdate({ _id: id},{
          nombres: data.nombres,
          apellido: data.apellido,
          telefono:data.telefono,
          f_nacimiento:data.f_nacimiento,
          cedula:data.cedula,
          genero:data.genero,
          pais:data.pais,
          password:hash
    
        })
        res.status(200).send({data:reg})
      })
     
    }else{
      var reg = await cliente.findByIdAndUpdate({ _id: id},{
        nombres: data.nombres,
        apellido: data.apellido,
        telefono:data.telefono,
        f_nacimiento:data.f_nacimiento,
        cedula:data.cedula,
        genero:data.genero,
        pais:data.pais
  
      })
      res.status(200).send({data:reg})

    }
  }
  const registro_direcciones_cliente= async function(req,res){
    let data=req.body
    if(data.principal){
      let direccion = await dirreccion.find({cliente:data.cliente})
      direccion.forEach(async(element)=>{
        await dirreccion.findOneAndUpdate({_id:element.id},{principal:false})
      })
    }
    let reg = await  dirreccion.create(data)
    console.log(reg);
    res.status(200).send({ data: reg });
  
  }
  const obtener_direcciones_cliente= async function(req,res){
   var id=req.params['id']
   let direccion = await dirreccion.find({cliente:id}).populate('cliente').sort({crearedAt:-1})
   res.status(200).send({ data: direccion });
  }
  //const cambiar_direcciones_principal__cliente= async function(req,res){
    //let id=req.params['id']
    //var data=req.params['cliente']
   // let direccion = await dirreccion.find({cliente:data.cliente})
     // direccion.forEach(async(element)=>{
       // await dirreccion.findOneAndUpdate({id:element.id},{principal:false})
      //})
      //await dirreccion.findOneAndUpdate({id:id})
    //res.status(200).send({ data: true },{principal:true});
  
 // }

module.exports = {
  login_cliente,
  listarclientes,
  registro_cliente_admin,
  obtener_cliente_admin,
  actualizar_cliente_Admin,
  eliminar_cliente_Admin,
  obtener_cliente_guest,
  actualizar_cliente_guest,
  registro_direcciones_cliente,
  obtener_direcciones_cliente,
  //cambiar_direcciones_principal__cliente
};
