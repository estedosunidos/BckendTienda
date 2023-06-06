const mongoose=require('mongoose');
const shema=mongoose.Schema
const dirreccionSchema=shema({
   cliente:{type: shema.ObjectId,ref:'cliente',required:false},
   destinatario:{type: String,required:false},
   dni:{type:String,required:true},
   zip:{type:String,required:true},
   direccion:{type:String,required:true},
   pais:{type:String,required:true},
   region:{type:String,required:false},
   ciudad:{type:String,required:false},
   telefono:{type:String,required:true},
   principal:{type:Boolean,required:true},
   crearedAt:{type:Date,default:Date.now,require:true}
})
module.exports=mongoose.model('dirreccion',dirreccionSchema)