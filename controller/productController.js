var Inventario = require("../models/inventarios");
var fs = require("fs");
var path = require("path");
var Producto = require("../models/producto");
const registro_product_admin = async (req, res) => {
  try {
    if (req.user && req.user.rol === "admin") {
      const data = req.body;
      const img_path = req.files.portada.path;
      const name = img_path.split("\\");
      const portada_name = name[2];
      data.slug = data.titulo
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      data.portada = portada_name;

      const reg = await Producto.create(data);
      const inventario = await Inventario.create({
        admin: req.user.sub,
        cantidad: data.stock,
        proveedor: "produucto",
        producto: data._id,
      });

      res.status(200).send({ data: reg, inventario: inventario });
    } else {
      res.status(403).send({ message: "No autorizado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const listar_producto_admin = async (req, res) => {
  try {
    const filtro = req.params["filtro"];
    const reg = await Producto.find({ titulo: new RegExp(filtro, "i") }).sort({
      crearedAt: -1,
    });
    res.status(200).send({ data: reg });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const obtener_portada = async (req, res) => {
  try {
    const img = req.params["img"];
    const statResult = await fs.promises.stat(`./upload/productos/${img}`);
    if (statResult) {
      const path_img = `./upload/productos/${img}`;
      res.status(200).sendFile(path.resolve(path_img));
    }
  } catch (error) {
    res.status(500).send({ data: undefined });
  }
};

const obtener_producto_admin = async (req, res) => {
  try {
    const id = req.params["id"];
    const rag = await Producto.findById({ _id: id });
    res.status(200).send({ data: rag });
  } catch (error) {
    res.status(500).send({ data: undefined });
  }
};

const updated_producto_admin = async (req, res) => {
  try {
    if (req.user && req.user.rol === "admin") {
      const data = req.body;
      const id = req.params["id"];

      if (req.files) {
        const img_path = req.files.portada.path;
        const name = img_path.split("\\");
        const portada_name = name[2];

        const reg = await Producto.findByIdAndUpdate(
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

        fs.stat(`./upload/productos/${req.portada}`, async (err) => {
          if (!err) {
            await fs.promises.unlink(`./upload/productos/${req.portada}`);
          }
        });

        res.status(200).send({ data: reg });
      } else {
        const reg = await Producto.findByIdAndUpdate(
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
      res.status(403).send({ message: "No autorizado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const eliminar_producto_Admin = async (req, res) => {
  try {
    const id = req.params["id"];
    const reg = await Producto.findByIdAndRemove({ _id: id });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const listar_inventario_producto_Admin = async (req, res) => {
  try {
    const id = req.params["id"];
    const reg = await Inventario.find({ producto: id })
      .populate("admin")
      .sort({ crearedAt: -1 });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const updated_producto_variedades_admin = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params["id"];
    const reg = await Producto.findByIdAndUpdate(
      { _id: id },
      {
        titulo_variada: data.titulo_variada,
        variables: data.variables,
      }
    );
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const Add_Img_galeria_admin = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params["id"];
    const img_path = req.files.imagen.path;
    const name = img_path.split("\\");
    const imagen_name = name[2];

    const reg = await Producto.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          galeria: {
            imagen: imagen_name,
            _id: data._id,
          },
        },
      }
    );
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const delete_Img_galeria_admin = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params["id"];
    const reg = await Producto.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          galeria: {
            _id: data._id,
          },
        },
      }
    );
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const registro_inventario_prodcuto_admin = async (req, res) => {
  try {
    const data = req.body;
    const reg = await Inventario.create(data);
    const prod = await Producto.findById({ _id: reg.producto });
    const nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad);
    const producto = await Producto.findByIdAndUpdate(
      { _id: reg.producto },
      {
        stock: nuevo_stock,
      }
    );
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const delete_inventario_prodcuto_Admin = async (req, res) => {
  try {
    const id = req.params["id"];
    const reg = await Inventario.findOneAndDelete({ _id: id });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const listar_producto_publico = async (req, res) => {
  try {
    const filtro = req.params["filtro"];
    const reg = await Producto.find({ titulo: new RegExp(filtro, "i") }).sort({
      crearedAt: -1,
    });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const listar_producto_nuevo_publico = async (req, res) => {
  try {
    const filtro = req.params["filtro"];
    const reg = await Producto.find({ titulo: new RegExp(filtro, "i") })
      .sort({ crearedAt: -1 })
      .limit(8);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const listar_producto_masventido_publico = async (req, res) => {
  try {
    const filtro = req.params["filtro"];
    const reg = await Producto.find({ titulo: new RegExp(filtro, "i") })
      .sort({ nventas: -1 })
      .limit(8);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const listar_productos_slug_publico = async (req, res) => {
  try {
    const slug1 = req.params["slug"];
    const reg = await Producto.findOne({ slug: slug1 });
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const listar_producto_recomendado_publico = async (req, res) => {
  try {
    const categoria1 = req.params["categoria"];
    const reg = await Producto.find({ categoria: categoria1 })
      .sort({ crearedAt: -1 })
      .limit(8);
    res.status(200).send({ data: reg });
  } catch (error) {
    res.status(500).send({ message: "Error en el servidor" });
  }
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
  listar_producto_recomendado_publico,
  listar_producto_nuevo_publico,
  listar_producto_masventido_publico,
};
