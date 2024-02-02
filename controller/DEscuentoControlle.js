var descuente = require("../models/Descuento");
var fs = require("fs");
var path = require("path");
const registro_descuento_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      let data = req.body;
      var img_path = req.files.Banner.path;
      var name = img_path.split("\\");
      var banner_name = name[2];

      data.Banner = banner_name;
      let reg = await descuente.create(data);

      res.status(200).send({ data: reg });
    } else {
    }
  } else {
  }
};
const listar_descuento_admin = async function (req, res) {
  console.log(req.data);
  var filtro = req.params["filtro"];
  let reg = await descuente
    .find({ titulo: new RegExp(filtro, "i") })
    .sort({ crearedAt: -1 });
  res.status(200).send({ data: reg });
};
const obtener_banner = async function (req, res) {
  var img = req.params["img"];
  fs.stat("./upload/descuentos/" + img, function (err) {
    if (!err) {
      let path_img = "./upload/descuentos/" + img;
      console.log(path_img);
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};
const obtener_descuento_admin = async function (req, res) {
  var id = req.params["id"];
  try {
    var rag = await descuente.findById({ _id: id });
    res.status(200).send({ data: rag });
  } catch (error) {
    res.status(500).send({ data: undefined });
  }
};
const updated_descuento_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      var data = req.body;
      var id = req.params["id"];
      if (req.files) {
        //Si hay imagen
        var img_path = req.files.banner.path;
        var name = img_path.split("\\");
        var banner_name = name[2];
        let reg = await descuente.findByIdAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            banner: banner_name,
            descuento: data.descuento,
            Fecha_Inicio: data.Fecha_Inicio,
            Fecha_Fin: data.Fecha_Fin,
          }
        );
        fs.stat("./upload/descuentos/" + req.banner, function (err) {
          if (!err) {
            //esta linea de codigo es para eliminar una imagen en el erchivo de producto
            fs.unlink("./upload/descuentos/" + req.banner, (err) => {
              if (err) throw err;
            });
          }
        });
        res.status(200).send({ data: reg });
      } else {
        //No hay imagen
        let reg = await descuente.findByIdAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            descuento: data.descuento,
            Fecha_Inicio: data.Fecha_Inicio,
            Fecha_Fin: data.Fecha_Fin,
          }
        );
        res.status(200).send({ data: reg });
      }
    } else {
    }
  } else {
  }
};
const eliminar_descuento_Admin = async function (req, res) {
  var id = req.params["id"];
  let reg = await descuente.findByIdAndRemove({ _id: id });
  res.status(200).send({ data: reg });
};
const obtener_descuento_activo = async function (req, res) {
  let descuentos = await descuente.find().sort({ createdAt: -1 });
  var arr_descuento = [];
  var today = Date.parse(new Date().toString()) / 1000;
  descuentos.forEach((eleement) => {
    var tt_inicio =
      Date.parse(new Date(eleement.Fecha_Inicio + "T00:00:00")) / 1000;
    var tt_fin = Date.parse(new Date(eleement.Fecha_Fin + "T23:59:59")) / 1000;

    if (today >= tt_inicio && today <= tt_fin) {
      arr_descuento.push(eleement);
      console.log(arr_descuento);
    }
  });
  if (arr_descuento.length >= 1) {
    res.status(200).send({ data: arr_descuento });
  } else {
    res.status(200).send({ data: undefined });
  }
};
module.exports = {
  registro_descuento_admin,
  listar_descuento_admin,
  obtener_banner,
  obtener_descuento_admin,
  updated_descuento_admin,
  eliminar_descuento_Admin,
  obtener_descuento_activo,
};
