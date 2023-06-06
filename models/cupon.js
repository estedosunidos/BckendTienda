const mongoose=require('mongoose');
const shema=mongoose.Schema
const cupontSchema=shema({
   codigo:{type:String,required:false},
   tipo:{type:String,required:false},//porcetaje||precio fijo
   valor:{type:Number,required:false},
   limite: {type: Number,required:false},
   crearedAt:{type:Date,default:Date.now,require:true}
})
module.exports=mongoose.model('cupon',cupontSchema)