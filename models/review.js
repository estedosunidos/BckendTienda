const mongoose=require('mongoose');
const shema=mongoose.Schema
const reviewSchema=shema({
   producto:{type: shema.ObjectId,ref:'producto',required:false},
   cliente:{type: shema.ObjectId,ref:'cliente',required:false},
   venta:{type: shema.ObjectId,ref:'venta',required:false},
   review:{type:String,required:true},
   star:{type:Number,required:true},
   crearedAt:{type:Date,default:Date.now,require:true}
})
module.exports=mongoose.model('review',reviewSchema)