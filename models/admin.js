const mongoose=require('mongoose');
const shema=mongoose.Schema
const adminschema=shema({
    nombre:{  type: String},
    apellido:{type: String},
    email:{type: String},
    password:{type: String},
    telefono:{type: String},
    rol:{type: String},
    cedula:{type: String},
})
module.exports = mongoose.model("admin",adminschema)