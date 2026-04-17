//Servidor
const express = require('express');
const cors = require('cors');
const logger = require ('morgan');
const bodyParser = require('body-parser');
//Apis
const http = require ('http');
const app = express();

app.use(cors({
   origin: 'http://localhost:5173',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => res.status(200).send({
   message: 'Bienvendido a mi API de tienda virtual',
}));

require ('./routes/route_categorias')(app);
require ('./routes/route_carritos')(app);
require ('./routes/route_productos')(app);
require ('./routes/route_usuarios')(app);
require ('./routes/route_carrito_detalle')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;