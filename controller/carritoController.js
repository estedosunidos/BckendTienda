var carrito = require('../models/carrito');

const agregar_Carrito_cliente = async function(req,res){
    let data=req.body;
    console.log("ss",data)
    let carrito_cliente= await carrito.find({cliente:data.cliente,producto:data.producto})
    console.log("cc",carrito_cliente)
    let reg=await carrito.create(data)
    res.status(200).send({data:reg});
}
const obtener_Carrito_cliente = async function(req,res){
    let id=req.params['id'];
    let carrito_cliente= await carrito.find({cliente:id}).populate('producto')
    res.status(200).send({data:carrito_cliente});
}
const eliminar_Carrito_cliente = async function(req,res){
    let id=req.params['id'];
    let carrito_cliente= await carrito.findByIdAndDelete({_id:id})
    res.status(200).send({data:carrito_cliente});
}

module.exports = {agregar_Carrito_cliente,obtener_Carrito_cliente,eliminar_Carrito_cliente}