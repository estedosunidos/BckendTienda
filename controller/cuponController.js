var Cupon = require("../models/cupon");
//---------------------------------------------------------------//
const registro_cupon_admin = async function (req, res) {
      let data = req.body;
      let reg = await Cupon.create(data);
      res.status(200).send({ data: reg });
};
//---------------------------------------------------------------//
const listar_cupones_Admin = async function (req, res) {
      var filtro = req.params["filtro"];
      let reg = await Cupon.find({ codigo: new RegExp(filtro, "i") });
      res.status(200).send({ data: reg });
};
//------------------------------------------------------------------------//
const obtener_cuponer_admin = async function (req, res) {
      var id = req.params["id"];
      try {
        var reg = await Cupon.findById({ _id: id });
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(500).send({ data: undefined });
      }
};
//------------------------------------------------------------------------//
const actualizar_cupones_Admin = async function (req, res) {
      var id = req.params["id"];
      var data = req.body;
      var reg = await Cupon.findByIdAndUpdate(
        { _id: id },
        {
          codigo: data.codigo,
          tipo: data.tipo,
          valor: data.valor,
          limite: data.limite,
        }
      );
};
//------------------------------------------------------------------------------//
const eliminar_cupones_admin = async function (req, res) {
      var id = req.params["id"];
      let reg = await Cupon.findByIdAndRemove({ _id: id });
      res.status(200).send({ data: reg });
};
module.exports = {
  registro_cupon_admin,
  listar_cupones_Admin,
  obtener_cuponer_admin,
  actualizar_cupones_Admin,
  eliminar_cupones_admin,
};
