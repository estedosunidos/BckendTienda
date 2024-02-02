const jwt = require('jwt-simple');
const moment = require('moment');

const secret = "ivanvargas";

const auth = function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(500).send({ message: "NoHeaderError" });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');
    const segments = token.split('.');

    if (segments.length !== 3) {
      return res.status(403).send({ message: "InvalidToken" });
    }

    const payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {
      return res.status(403).send({ message: "TokenExpired" });
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(403).send({ message: "InvalidToken" });
  }
};

module.exports = { auth };
