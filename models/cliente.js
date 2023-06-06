const mongoose=require('mongoose');
const shema=mongoose.Schema
const clienteSchema=shema({
    nombre:{ type: String, required: false},
    apellido:{type: String, required: false},
    pais:{type: String, required: false},
    email:{type: String, required: false},
    password:{type: String},
    perfil:{type: String, required: false},
    telefono:{type: String, required: false},
    genero:{type: String, required: false},
    f_nacimiento:{type: String, required: false},
    cedula:{type: String, required: false},
    createdAt:{type:Date,default:Date.now,required:true},
})
module.exports = mongoose.model("cliente",clienteSchema)