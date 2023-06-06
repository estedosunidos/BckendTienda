const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port= process.env.PORT||4201
const server=require('http').createServer(app)
const io = require('socket.io')(server,{
  cors: {origin: '*'}
})
io.on('connection',function(socket){
  socket.on('delete-carrito',function(data){
    io.emit('new-carrito',data)
   console.log(data)
  })
 socket.on('add-carrito',function(data){
    io.emit('new-carrito-add',data)
    console.log(data)
  })
}
)


const cliente_route = require('../Backend/routes/cliente');
const admin_route = require('../Backend/routes/admin');
const product_route = require('../Backend/routes/product');
const cupon_route = require('../Backend/routes/cupon');
const config_router = require('../Backend/routes/config');
const carrito_router = require('../Backend/routes/carrito');

mongoose.connect('mongodb://127.0.0.1:27017/Tienda');

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
  server.listen(port, function () {
    console.log("listening on port");
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cors());



app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY,Origin, X-Requested-With,Content-type, Access-control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Allow','GET,PUT,POST,DELETE,OPTIONS');
  next()
})

app.use('/api', cliente_route);
app.use('/api', admin_route);
app.use('/api', product_route)
app.use('/api', cupon_route)
app.use('/api', config_router)
app.use('/api', carrito_router)

module.exports = app;