//Servidor
const express = require('express');
const logger = reuquire ('morgan');
const bodyParser = require('body-parser');
//Apis
const http = require ('http');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => res.status(200).send({
   message: 'Bienvendido a mi API de tienda virtual',
}));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
module.exports = app;