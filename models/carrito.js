const mongoose=require('mongoose');
const shema=mongoose.Schema
const carritoSchema=shema({
   producto:{type: shema.ObjectId,ref:'producto',required:false},
   cliente:{type: shema.ObjectId,ref:'cliente',required:false},
   cantidad:{type: Number,required:true},
   variedad:{type:String,required:true},
   crearedAt:{type:Date,default:Date.now,require:true}
})
module.exports=mongoose.model('carrito',carritoSchema)