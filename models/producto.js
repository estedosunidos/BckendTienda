const mongoose=require('mongoose');
const shema=mongoose.Schema
const productSchema=shema({
    titulo:{type:String,require: true},
    slug:{type: String, require: false},
    galeria:[{type:Object, require: false}],
    portada: {type:String, require:true},
    precio:{type:Number, require:true},
    descripcion: {type: String,require: true},
    contenido:{type:String,require:true},
    stock:{type:Number, require: true},
    nventas:{type:Number,default:0, require: false},
    npuntos:{type:Number, default:0,require: false},
    variables:[{type:Object, require: false}],
    titulo_variada:{type:String, require:false},
    categoria:{type:String,require: true},
    estado:{type:String,default:'Edicion',require: false},
    crearedAt:{type:Date,default:Date.now,require:true}
})
module.exports=mongoose.model('producto',productSchema)