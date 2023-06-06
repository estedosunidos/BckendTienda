var config = require("../models/config");
var fs = require("fs");
var path = require("path");

const actualizar_config_admin = async function (req, res) {
      //traer los datos del frontend
      let data = req.body;
      if(req.files){
         //Si hay imagen
         console.log("Si hay Imagen")
         var img_path = req.files.logo.path;
         var name = img_path.split("\\");
         var logo_name = name[2];

         let reg = await config.findByIdAndUpdate(
          { _id: '643f08beec1ab170c5d319a8'},
          {
            categorias: JSON.parse(data.categorias),
            titulo: data.titulo,
            serie: data.serie,
            logo:logo_name,
            correlativo: data.correlativo,
          }
        );
      

        fs.stat("./upload/configuraciones/" + req.logo, function (err) {
          if (!err) {
            //esta linea de codigo es para eliminar una imagen en el erchivo de producto
            fs.unlink("./upload/configuraciones/" + req.logo, (err) => {
              if (err) throw err;
            });
          }
        });
        res.status(200).send({ data: reg });
      }else{
        console.log("no hay Imagen")
        let reg = await config.findByIdAndUpdate(
          { _id: '643f08beec1ab170c5d319a8'},
          {
            categorias: data.categorias,
            titulo: data.titulo,
            serie: data.serie,
            correlativo: data.correlativo,
          }
        );
        res.status(200).send({ data: reg });
        
      }
    
};
const obtener_config_admin= async function(req,res){
  let reg = await config.findById({_id:'643f08beec1ab170c5d319a8'})
  console.log(reg);
  res.status(200).send({ data: reg });

}
const obtener_logo = async function (req, res) {
  var img = req.params["img"];
  fs.stat("./upload/configuraciones/" + img, function (err) {
    if (!err) {
      let path_img = "./upload/configuraciones/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};
const obterner_confi_publico =async function(req,res){
 
  let reg = await config.findById({_id:'643f08beec1ab170c5d319a8'})
  res.status(200).send({data:reg})

}
module.exports = {
  actualizar_config_admin,
  obtener_config_admin,
  obtener_logo,
  obterner_confi_publico,};
