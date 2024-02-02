const mongoose=require('mongoose');
const shema=mongoose.Schema
const descuentoSchema=shema({
   titulo:{type: String,required:false},
   Banner:{type: String,required:false},
   Descuento:{type: Number,required:false},
   Fecha_Inicio:{type:String,required:false},
   Fecha_Fin:{type: String,required:false},
   crearedAt:{type:Date,default:Date.now,require:true}
})
module.exports=mongoose.model('descuento',descuentoSchema)