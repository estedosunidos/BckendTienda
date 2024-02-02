const mongoose=require('mongoose');
const shema=mongoose.Schema
const contactoSchema=shema({
   cliente:{type: String,required:false},
   mensaje:{type: String,required:false},
   asunto:{type: String,required:false},
   estado:{type:String,required:false},
   phone:{type:String,required:false},
   email:{type:String,required:false},
   crearedAt:{type:Date,default:Date.now,require:true}
})
module.exports=mongoose.model('contacto',contactoSchema)