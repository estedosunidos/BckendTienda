var carrito = require("../models/carrito");

const agregar_Carrito_cliente = async (req, res) => {
  try {
    const data = req.body;
    console.log("ss", data);

    const carrito_cliente = await carrito.find({
      cliente: data.cliente,
      producto: data.producto,
    });
    console.log("cc", carrito_cliente);

    const nuevoCarrito = await carrito.create(data);

    res.status(200).json({ data: nuevoCarrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const obtener_Carrito_cliente = async (req, res) => {
  try {
    const id = req.params.id;

    const carrito_cliente = await carrito
      .find({ cliente: id })
      .populate("producto");

    res.status(200).json({ data: carrito_cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const eliminar_Carrito_cliente = async (req, res) => {
  try {
    const id = req.params.id;

    const carrito_cliente = await carrito.findByIdAndDelete(id);

    res.status(200).json({ data: carrito_cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  agregar_Carrito_cliente,
  obtener_Carrito_cliente,
  eliminar_Carrito_cliente,
};
