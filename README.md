# Backend CRUD API REST (con seguridad)

_Ejemplo de WS REST con NodeJS que proporciona un API CRUD para gestionar una DB MongoDB._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

Para trabajar usaremos  una **máquina virtual**, aunque se puede trabajar en Windows, Linux u OS X.

La máquina para que nos funcione correctamente como mínimo tendrá 2GHz de procesador, 4GB de RAM y 25GB de HD. Además instalaremos la última versión estable de 64 bits de **Ubuntu**.

Toda la práctica está explicada para la 20.04 LTS. Podemos verificar los parámetros con los comandos:
```
$ lab_release -a
$ uname -m
$ df -h
```
Si usamos el gestor VirtualBox podemos usar la imagen ISO de la última versión de Ubuntu. Es recomendable instalar las extensiones del gestor (desde VirtualBox le diremos que monte el disco con el nuevo software).

Una vez tengamos nuestra máquina preparada ya podemos empezar a instalar todos los programas que necesitemos

### Instalación 🔧

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_

_Indica cómo será ese paso_

Para la ejecución de esta práctica se necesita tener:
* MongoBD (con mongodb y mongojs)
* Nodemon 
* Morgan
* Postman
* NodeJS (con Express)
* Git
* Code (o similar)
* Apache2

Instalamos los programas
```
$ sudo snap install --classic code
$ sudo snap install postman

$ sudo apt install apache2
$ sudo apt install npm
$ sudo apt install git
$ sudo apt install -y mongodb
```
Creamos carpeta de trabajo:
```
$ mkdir node
$ cd node
$ mkdir api-rest
$ cd api-rest
```
Instalamos las bibliotecas
```
$ npm i -S express
$ npm i -D nodemon
$ npm i -S morgan
$ npm i -S mongodb
$ npm i -S mongojs
```

Preparamos algunos programas:
#### Node
```
$ sudo npm clean -f
$ sudo npm i -g n
$ sudo n stable
```
Si queremos comprobar las versiones
```
$ node --version
$ npm -v
```
##### Express
Para crear nuestra aplicación **node+express** incorporamos en `index.js`:
```
const express = require('express');
```

#### Git
```
$ git config --global user.name gsl21
$ git config --global user.email gsl21@alu.ua.es
```
Depende de si partimos de un repositorio o no haremos unos comandos u otros.

#### Nodemon
Con Code incluimos en el archivo `package.json` en la sección de scripts para que invoque nodemon.
```
"start": "nodemon index.js",
```
#### Morgan
Lo configuramos como un middleware de Node, así tendremos un logger en nuestra aplicación.

En nuestro `index.js` pondremos:
```
const logger = require('morgan');
```

#### MongoDB
Iniciamos apache2 y mongoDB (puede ser en otra terminal):
```
$ sudo systemctl start apache2
$ sudo systemctl start mongodb
```
Podemos verificar el funcionamiento
```
$ mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```
abrimos el gestor de la case de datos:
```
$ mongo --host 127.0.0.1:27017
> show dbs
```
## Creación del servício CRUD mediante API RESTful y MongoDB ⚙️

Creamos nuestro API. En `index.js`, importamos la biblioteca **mongojs** y conectamos con la base de datos que llamaremos "SD".
```
const mongojs = require('mongojs');
var db = mongojs("SD");
```
### Middlewares
```
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
```
Creamos uno con función de **callback** para dar soporte a varias colecciones. Donde en el argumento "coleccion" introduciremos rutas en los siguientes pasos.
```
app.param("coleccion", (req,res,next, coleccion) => {
    req.collection = db.collection(coleccion);
    return next();
});
```
### Métodos
En nuestro `index.js` tenemos métodos que pueden hacer las siguientes acciones. A continuación mostramos como serían las peticiones a través de Postman. Todas las rutas están en la [colección de Postman](https://github.com/solsolet/api-rest/blob/master/SD.postman_collection.json)
#### Get
Podemos ver qué colecciones tenemos: 
```
GET http://localhost:3000/api
```
todos los elementos de una colección y un elemento en concreto (añadir /:id).
```
GET http://localhost:3000/api/familia
GET http://localhost:3000/api/familia/621f593923627a74f4d5f0d8
```
#### Post
Podemos añadir elementos a una colección:
```
POST http://localhost:3000/api/familia
```
escribiendo en el **body** de nuestra consulta. El formato debe ser (raw,JSON)
#### Update
Podemos modificar un elemento de la colección (añadiendo campos o modificándolos)
```
PUt http://localhost:3000/api/mascotas/6220963823627a74f4d5f0dc
```
escribiendo en el **body**.
#### Delete
Podemos eliminar un elemento de nuestra colección
```
DELETE https://localhost:3000/api/mascotas/6220963823627a74f4d5f0dc
```

## Prueba del servício ✅
Con MongoDB iniciado en nuestra terminal podemos escribir comandos como
```
$ mongo
> use SD
> show collections
familia
mascotas
>  db.familia.find()
{ "_id" : ObjectId("621f593923627a74f4d5f0d8"), "tipo" : "Hermano", "nombre" : "Pepe", "edad" : 46 }
{ "_id" : ObjectId("6220929323627a74f4d5f0da"), "tipo" : "cuñado", "nombre" : "Juan", "edad" : 47, "comida" : "cocido" }
```

## Construido con 🛠️

* [Postman](http://www.postman.com) - Plataforma API
* [VS Code](https://code.visualstudio.com) - Editor de texto
* [MongoDB](https://www.mongodb.com) - Base de Datos
* [NodeJS](https://nodejs.org) - Base de Datos

## Versionado 📌

Para todas las versiones disponibles, mira los [tags](https://github.com/tu/proyecto/tags).

## Autora ✒️

* **Gemma Sellés** - *Trabajo Inicial* - [gls21](https://github.com/solsolet)


## Licencia 📄

Este proyecto no está bajo ninguna licencia.
