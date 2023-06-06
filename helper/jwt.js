var jwt = require("jwt-simple")
var moment=require("moment")
var secret="ivanvargas"

exports.createToken=function(user){
    var payload={
        sub:user._id,
        nombre:user.nombre,
        apellidos:user.apellido,
        email:user.email,
        rol:user.rol,
        iat: moment().unix(),
        exp:moment().add(7,"days").unix()

    }
    console.log("wwww",payload)
    return jwt.encode(payload,secret)
}