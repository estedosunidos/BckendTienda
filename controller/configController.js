var config = require("../models/config");
var fs = require("fs");
var path = require("path");

const actualizar_config_admin = async (req, res) => {
  try {
    const data = req.body;
    const configId = "643f08beec1ab170c5d319a8";

    if (req.files) {
      console.log("Si hay Imagen");
      const img_path = req.files.logo.path;
      const name = img_path.split("\\");
      const logo_name = name[2];

      const updatedConfig = await config.findByIdAndUpdate(
        { _id: configId },
        {
          categorias: JSON.parse(data.categorias),
          titulo: data.titulo,
          serie: data.serie,
          logo: logo_name,
          correlativo: data.correlativo,
        }
      );

      const existingLogoPath = `./upload/configuraciones/${req.logo}`;
      fs.stat(existingLogoPath, (err) => {
        if (!err) {
          fs.unlink(existingLogoPath, (unlinkErr) => {
            if (unlinkErr) throw unlinkErr;
          });
        }
      });

      res.status(200).send({ data: updatedConfig });
    } else {
      console.log("No hay Imagen");
      const updatedConfig = await config.findByIdAndUpdate(
        { _id: configId },
        {
          categorias: data.categorias,
          titulo: data.titulo,
          serie: data.serie,
          correlativo: data.correlativo,
        }
      );

      res.status(200).send({ data: updatedConfig });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const obtener_config_admin = async (req, res) => {
  try {
    const configId = "643f08beec1ab170c5d319a8";
    const configData = await config.findById({ _id: configId });
    res.status(200).send({ data: configData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const obtener_logo = async (req, res) => {
  try {
    const img = req.params.img;
    const imgPath = `./upload/configuraciones/${img}`;

    fs.stat(imgPath, (err) => {
      if (!err) {
        res.status(200).sendFile(path.resolve(imgPath));
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

const obterner_confi_publico = async (req, res) => {
  try {
    const configId = "643f08beec1ab170c5d319a8";
    const configData = await config.findById({ _id: configId });
    res.status(200).send({ data: configData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error en el servidor" });
  }
};

module.exports = {
  actualizar_config_admin,
  obtener_config_admin,
  obtener_logo,
  obterner_confi_publico,
};
