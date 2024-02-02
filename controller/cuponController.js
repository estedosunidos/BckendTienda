var Cupon = require("../models/cupon");
const registro_cupon_admin = async (req, res) => {
  try {
    const data = req.body;
    const reg = await Cupon.create(data);
    res.status(200).send({ data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const listar_cupones_Admin = async (req, res) => {
  try {
    const filtro = req.params["filtro"];
    const reg = await Cupon.find({ codigo: new RegExp(filtro, "i") });
    res.status(200).send({ data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const obtener_cuponer_admin = async (req, res) => {
  try {
    const id = req.params["id"];
    const reg = await Cupon.findById({ _id: id });
    res.status(200).send({ data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: undefined });
  }
};

const actualizar_cupones_Admin = async (req, res) => {
  try {
    const id = req.params["id"];
    const data = req.body;
    const reg = await Cupon.findByIdAndUpdate(
      { _id: id },
      {
        codigo: data.codigo,
        tipo: data.tipo,
        valor: data.valor,
        limite: data.limite,
      }
    );
    res.status(200).send({ data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const eliminar_cupones_admin = async (req, res) => {
  try {
    const id = req.params["id"];
    const reg = await Cupon.findByIdAndRemove({ _id: id });
    res.status(200).send({ data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

module.exports = {
  registro_cupon_admin,
  listar_cupones_Admin,
  obtener_cuponer_admin,
  actualizar_cupones_Admin,
  eliminar_cupones_admin,
};
