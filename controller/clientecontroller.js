const cliente = require("../models/cliente");
const contacto = require("../models/contacto");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helper/jwt");
const { hash } = require("bcrypt");
var dirreccion = require("../models/dirrecciones");
var venta = require("../models/venta");
var review = require("../models/review");
const login_cliente = async (req, res) => {
  try {
    const data = req.body;
    const clienteArr = await cliente.find({ email: data.email });

    if (clienteArr.length === 0) {
      return res
        .status(200)
        .json({ message: "No se encontró el correo", data: undefined });
    }

    const user = clienteArr[0];
    const passwordMatch = await bcrypt.compare(data.passworld, user.password);

    if (passwordMatch) {
      return res.status(200).json({ data: user, token: jwt.createToken(user) });
    } else {
      return res.status(403).json({ message: "No es igual la contraseña" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const listarclientes = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    const filtro = req.params.filtro;

    if (!tipo || tipo === "null") {
      const registro = await cliente.find();
      return res.status(200).json({ data: registro });
    }

    if (tipo === "apellido") {
      const registro = await cliente.find({
        apellido: new RegExp(filtro, "i"),
      });
      return res.status(200).json({ data: registro });
    } else if (tipo === "email") {
      const registro = await cliente.find({ email: new RegExp(filtro, "i") });
      return res.status(200).json({ data: registro });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const registro_cliente_admin = async (req, res) => {
  try {
    const data = req.body;
    const resp = await cliente.create(data);
    return res.status(200).json({ data: resp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const obtener_cliente_admin = async (req, res) => {
  try {
    const id = req.params.id;
    const rag = await cliente.findById(id);
    return res.status(200).json({ data: rag });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const actualizar_cliente_Admin = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const reg = await cliente.findByIdAndUpdate(id, {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      f_nacimiento: data.f_nacimiento,
      genero: data.genero,
      cedula: data.cedula,
    });
    return res.status(200).json({ data: reg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

const eliminar_cliente_Admin = async (req, res) => {
  try {
    const id = req.params.id;
    const reg = await cliente.findByIdAndRemove(id);
    return res.status(200).json({ data: reg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const obtener_cliente_guest = async (req, res) => {
  try {
    const id = req.params.id;
    const rag = await cliente.findById(id);
    return res.status(200).json({ data: rag });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const actualizar_cliente_guest = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        const reg = await cliente.findByIdAndUpdate(id, {
          nombres: data.nombres,
          apellido: data.apellido,
          telefono: data.telefono,
          f_nacimiento: data.f_nacimiento,
          cedula: data.cedula,
          genero: data.genero,
          pais: data.pais,
          password: hash,
        });
        return res.status(200).json({ data: reg });
      });
    } else {
      const reg = await cliente.findByIdAndUpdate(id, {
        nombres: data.nombres,
        apellido: data.apellido,
        telefono: data.telefono,
        f_nacimiento: data.f_nacimiento,
        cedula: data.cedula,
        genero: data.genero,
        pais: data.pais,
      });
      return res.status(200).json({ data: reg });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const registro_direcciones_cliente = async (req, res) => {
  try {
    const data = req.body;

    if (data.principal) {
      const direcciones = await dirreccion.find({ cliente: data.cliente });

      for (const element of direcciones) {
        await dirreccion.findOneAndUpdate(
          { _id: element.id },
          { principal: false }
        );
      }
    }

    const reg = await dirreccion.create(data);
    console.log(reg);
    return res.status(200).json({ data: reg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const obtener_direcciones_cliente = async (req, res) => {
  try {
    const id = req.params.id;
    const direcciones = await dirreccion
      .find({ cliente: id })
      .populate("cliente")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: direcciones });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const obtenerdireccionprincipalcliente = async (req, res) => {
  try {
    const id = req.params.id;
    const direccion = await dirreccion.findOne({
      cliente: id,
      principal: true,
    });

    if (!direccion) {
      return res.status(200).json({ data: undefined });
    }

    return res.status(200).json({ data: direccion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const enviarmensaje_contacto = async (req, res) => {
  try {
    const data = req.body;
    data.estado = "abierto";
    const reg = await contacto.create(data);
    return res.status(200).json({ data: reg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const obtener_ordenes_cliente = async (req, res) => {
  try {
    const id = req.params.id;
    const reg = await venta
      .find({ cliente: id })
      .populate("cliente")
      .sort({ createdAt: -1 });

    if (reg.length > 0) {
      return res.status(200).json({ data: reg });
    } else {
      return res.status(500).json({ data: undefined });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const obtener_detalles_ordenes_cliente = async (req, res) => {
  try {
    const id = req.params.id;
    const venta = await venta.findById(id).populate("direccion");
    const detalle = await venta.find({ detalle: id }).populate("producto");

    return res.status(500).json({ data: venta, detalle: detalle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

const emitirreviewproductocliente = async (req, res) => {
  try {
    const data = req.body;
    const reg = await review.create(data);
    return res.status(200).json({ data: reg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: undefined });
  }
};

module.exports = {
  login_cliente,
  listarclientes,
  registro_cliente_admin,
  obtener_cliente_admin,
  actualizar_cliente_Admin,
  eliminar_cliente_Admin,
  obtener_cliente_guest,
  actualizar_cliente_guest,
  registro_direcciones_cliente,
  obtener_direcciones_cliente,
  obtenerdireccionprincipalcliente,
  enviarmensaje_contacto,
  obtener_ordenes_cliente,
  obtener_detalles_ordenes_cliente,
  emitirreviewproductocliente,
};

