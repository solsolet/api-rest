//1a ver
/*var http = require('http');
var server = http.createServer();

function HTTP_Response (request,response) {
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.write('Hola a todas y a todos!\n');
    response.end();
}

server.on('request',HTTP_Response);
server.listen(8080);

console.log('Servidor ejecutándose en puerto 8080...');*/

//node+express ver
/*'use strict'

const express = require('express');
const app = express();

app.get('/hola',(request,response) => {
    response.send('Hola a todas y a todos desde Express!')
});

app.listen(8080,() => {
    console.log('API REST ejecutándose en http://localhost:8080/hola');
});*/

//ruta /hola/:unNombre
'use strict'

const port = process.env.PORT || 8888;

const express = require('express');
const app = express();

app.get('/hola/:unNombre',(req,res) => {
    res.status(200).send({ mensaje: `Hola ${req.params.unNombre} desde SD!`});
});

app.listen(port, () => {
    console.log(`API REST ejecutándose en http://localhost:${port}/hola/:unNombre`);
});