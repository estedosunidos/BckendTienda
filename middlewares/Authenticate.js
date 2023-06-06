var jwt = require('jwt-simple')
var moment= require('moment')
var secret="ivanvargas"


const auth=function(req,res,next){
    if(req.headers.authorization){
        next()
        }else{
            return res.status(500).send({message:"NoHeadererro"})
        }
    var token=req.headers.authorization.replace(/['"]+/g,'')
    var segment= token.split('.')

    if(segment.length !=3){
        return res.status(403).send({message:"invalid token"})
    }else{
        try{
            var payload=jwt.decode(token,secret)
            if(payload.exp <= moment().unix()){
                return res.status(403).send({message:"TokenExpirado"})
            }

        }catch(err){
            return res.status(403).send({message:"invalid token"})
        }
    }
    return req.user=payload
}
module.exports={auth}