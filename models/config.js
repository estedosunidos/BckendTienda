const mongoose=require('mongoose');
const shema=mongoose.Schema
const configSchema=shema({
    categorias:[{type:Object,required:true}],
    titulo:{type: String, required: true},
    logo:{type: String, required: true},
    serie:{type: String, required: true},
    correlativo:{type: String, required: true},
    createdAt:{type:Date,default:Date.now,required:true},
})
module.exports = mongoose.model("config",configSchema)