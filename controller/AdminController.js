const admin = require("../models/admin");
const contacto = require("../models/contacto");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helper/jwt");
//----------------------------------------------------------//
const registro_Admin = async function (req, res) {
  try {
    const data = req.body;

    // Buscar si ya existe un administrador con el mismo correo electrónico
    const adminArr = await admin.find({ email: data.email });

    if (adminArr.length > 0) {
      return res.status(500).send({
        message: "El correo ya existe en la base de datos",
        data: undefined,
      });
    }

    if (!data.password) {
      return res.status(500).send({
        message: "No hay una contraseña",
      });
    }

    // Encriptar la contraseña antes de almacenarla
    const hash = await bcrypt.hashSync(data.password);
    data.password = hash;

    // Crear un nuevo registro de administrador
    const registro = await admin.create(data);
    return res.status(200).send({
      data: registro,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error en el servidor",
    });
  }
};
//---------------------------------------------------------------------//
const login_admin = async function (req, res) {
  try {
    const data = req.body;
    const adminArr = await admin.find({ email: data.email });

    if (adminArr.length === 0) {
      return res
        .status(200)
        .send({ message: "No se encontró el correo", data: undefined });
    }

    const user = adminArr[0];
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      const token = jwt.createToken(user);
      return res.status(200).send({ data: user, token });
    } else {
      return res.status(403).send({ message: "No es igual la contraseña" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
};
const obtener_mensaje = async function (req, res) {
  try {
    const mensajes = await contacto.find().sort({ createdAt: -1 });
    console.log(mensajes);
    res.status(200).send({ data: mensajes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const cerra_mensaje_admin = async function (req, res) {
  try {
    const id = req.params.id;
    const mensajeActualizado = await contacto.findByIdAndUpdate(id, {
      estado: "cerrado",
    });
    res.status(200).send({ data: mensajeActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};
module.exports = {
  registro_Admin,
  login_admin,
  obtener_mensaje,
  cerra_mensaje_admin,
};
