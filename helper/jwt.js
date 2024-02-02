const jwt = require("jwt-simple");
const moment = require("moment");

const secret = "ivanvargas";

exports.createToken = function (user) {
  try {
    const payload = {
      sub: user._id,
      nombre: user.nombre,
      apellidos: user.apellido,
      email: user.email,
      rol: user.rol,
      iat: moment().unix(),
      exp: moment().add(7, "days").unix()
    };

    console.log("Token Payload:", payload); // Puedes omitir o personalizar esto según tus necesidades

    return jwt.encode(payload, secret);
  } catch (error) {
    console.error("Error creating token:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
