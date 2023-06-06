var Inventario = require("../models/inventarios");
var fs = require("fs");
var path = require("path");
var Producto = require("../models/producto");
//----------------------------------------------------------------//
const registro_product_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      let data = req.body;
      var img_path = req.files.portada.path;
      var name = img_path.split("\\");
      var portada_name = name[2];
      data.slug = data.titulo
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      data.portada = portada_name;
      let reg = await Producto.create(data);
      let inventario = await Inventario.create({
        admin: req.user.sub,
        cantidad: data.stock,
        proveedor: "produucto",
        producto: data._id,
      });
      res.status(200).send({ data: reg, inventario: inventario });
    } else {
    }
  } else {
  }
};
//------------------------------------------------------------------------------------------//
const listar_producto_admin = async function (req, res) {
  var filtro = req.params["filtro"];
  let reg = await Producto.find({ titulo: new RegExp(filtro, "i") });
  res.status(200).send({ data: reg });
};
//-----------------------------------------------------------------------------------------------//
const obtener_portada = async function (req, res) {
  var img = req.params["img"];
  fs.stat("./upload/productos/" + img, function (err) {
    if (!err) {
      let path_img = "./upload/productos/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};
//--------------------------------------------------------------------------------------------//
const obtener_producto_admin = async function (req, res) {
  var id = req.params["id"];
  try {
    var rag = await Producto.findById({ _id: id });
    res.status(200).send({ data: rag });
  } catch (error) {
    res.status(500).send({ data: undefined });
  }
};
//---------------------------------------------------------------------------------------//
const updated_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      var data = req.body;
      var id = req.params["id"];
      if (req.files) {
        //Si hay imagen
        var img_path = req.files.portada.path;
        var name = img_path.split("\\");
        var portada_name = name[2];
        let reg = await Producto.findByIdAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            stock: data.stock,
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            contenido: data.contenido,
            portada: portada_name,
          }
        );
        fs.stat("./upload/productos/" + req.portada, function (err) {
          if (!err) {
            //esta linea de codigo es para eliminar una imagen en el erchivo de producto
            fs.unlink("./upload/productos/" + req.portada, (err) => {
              if (err) throw err;
            });
          }
        });
        res.status(200).send({ data: reg });
      } else {
        //No hay imagen
        let reg = await Producto.findByIdAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            stock: data.stock,
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            contenido: data.contenido,
          }
        );
        res.status(200).send({ data: reg });
      }
    } else {
    }
  } else {
  }
}; //------------------------------------------------------------------------------------//
const eliminar_producto_Admin = async function (req, res) {
  var id = req.params["id"];
  let reg = await Producto.findByIdAndRemove({ _id: id });
  res.status(200).send({ data: reg });
};
//----------------------------------------------------------------------------------//
const listar_inventario_producto_Admin = async function (req, res) {
  var id = req.params["id"];
  let data = req.params["id"];
  var reg = await Inventario.find({ producto: id }).populate("admin").sort({crearedAt:+1});
  res.status(200).send({ data: reg });
};
const updated_producto_variedades_admin = async function (req, res) {
  var data = req.body;
  var id = req.params["id"];
  let reg = await Producto.findByIdAndUpdate(
    { _id: id },
    {
      titulo_variada: data.titulo_variada,
      variables: data.variables,
    }
  );
  res.status(200).send({ data: reg });
};
const Add_Img_galeria_admin = async function (req, res) {
  var data = req.body;
  var id = req.params["id"];
  var img_path = req.files.imagen.path;
  var name = img_path.split("\\");
  var imagen_name = name[2];

  let reg=await Producto.findByIdAndUpdate({_id: id}, {
    $push:{galeria:{
      imagen:imagen_name,
      _id:data._id
    }}
  })
  res.status(200).send({ data: reg });
};
const delete_Img_galeria_admin = async function (req, res) {
  var data = req.body;
  var id = req.params["id"];
  let reg=await Producto.findOneAndUpdate({_id: id}, {
    $pull:{galeria:{
      _id:data._id
    }}
  })
  res.status(200).send({ data: reg });
};
const registro_inventario_prodcuto_admin = async function(req,res){
  let data=req.body
  let reg = await Inventario.create(data)
  let prod=await Producto.findById({_id:reg.producto})
  let nuevo_stock=parseInt(prod.stock) + parseInt(reg.cantidad)
  let producto=await Producto.findByIdAndUpdate({_id:reg.producto},{
    stock:nuevo_stock
  })
  res.status(200).send({data:reg})
}
const delete_inventario_prodcuto_Admin= async function(req,res){
  var data = req.body;
  var id = req.params["id"];
  let reg=await Inventario.findOneAndUpdate({_id: id})
  res.status(200).send({ data: reg });
}
//--------Metodo Publico ---------//
const listar_producto_publico = async function (req, res) {
  var filtro = req.params["filtro"];
  let reg = await Producto.find({ titulo: new RegExp(filtro, "i") }).sort({crearedAt:-1});
  res.status(200).send({ data: reg });
};
const listar_productos_slug_publico = async function (req, res) {
  var slug1 = req.params['slug'];
  let reg = await Producto.findOne({ slug: slug1});
  res.status(200).send({ data: reg });
};
const listar_producto_recomendado_publico = async function (req, res) {
  var categoria1 = req.params["categoria"];
  let reg = await Producto.find({ categoria: categoria1 }).sort({crearedAt:-1}).limit(8);
  res.status(200).send({ data: reg });
};
module.exports = {
  updated_producto_variedades_admin,
  updated_producto_admin,
  registro_product_admin,
  listar_producto_admin,
  obtener_portada,
  obtener_producto_admin,
  eliminar_producto_Admin,
  listar_inventario_producto_Admin,
  Add_Img_galeria_admin,
  delete_Img_galeria_admin,
  registro_inventario_prodcuto_admin,
  delete_inventario_prodcuto_Admin,
  listar_producto_publico,
  listar_productos_slug_publico,
  listar_producto_recomendado_publico
};
