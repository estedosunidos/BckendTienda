const mongoose=require('mongoose');
const shema=mongoose.Schema
const inventariosSchema=shema({
   producto:{type: shema.ObjectId,ref:'producto',required:false},
   cantidad:{type: Number,required:true},
   admin:{type:shema.ObjectId,ref:'admin',required:true},
   proveedor:{type:String,required:true},
   crearedAt:{type:Date,default:Date.now,require:true}
})
module.exports=mongoose.model('inventario',inventariosSchema)