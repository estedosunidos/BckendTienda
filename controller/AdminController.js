const admin = require("../models/admin");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helper/jwt");
//----------------------------------------------------------//
const registro_Admin = async function (req, res) {
  const data = req.body;
  var admin_arr = [];

  admin_arr = await admin.find({ email: data.email });

  if (admin_arr.length == 0) {
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          const registro = await admin.create(data);
          res.status(200).send({
            data: registro,
          });
        } else {
          res.status(500).send({
            message: "error server",
          });
        }
      });
    } else {
      res.status(500).send({
        message: "No hay una contraseña",
      });
    }
  } else {
    res.status(500).send({
      message: "El correo ya existe en la base de dato",
      data: undefined,
    });
  }
};
//---------------------------------------------------------------------//
const login_admin = async function (req, res) {
      var data = req.body;
      var admin_arr = [];
      var token = "";
      admin_arr = await admin.find({ email: data.email });
      if (admin_arr.length == 0) {
        res
          .status(200)
          .send({ message: "No se encontro el correo", data: undefined });
      } else {
        let user = admin_arr[0];
        bcrypt.compare(
          data.password,
          user.password,
          async function (err, check) {
            if (check) {
              res
                .status(200)
                .send({ data: user, token: jwt.createToken(user) });
            } else {
              res.status(403).send({ message: "No es igual la contraseña" });
            }
          }
        );
      }
    
};
module.exports = { registro_Admin, login_admin };
