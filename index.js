//Primer API REST tipo CRUD
'use strict'

const port = process.env.PORT || 3000;
const express = require('express');
const logger = require('morgan');

const app = express();

//Declarem els middleware
app.use(logger('dev')); //probar amb: tiny, short, dev, common, combined
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//declarem nostres rutes i definim nostres controladors i log de negoci
app.get('/api/product', getProductController);

function getProductController(req,res) {
    res.status(200).send({
        msg: "ahí están todos los productos",
        productos: []
    })
}
//recuperem un producte (amb funció embebida)
app.get('/api/product/:productID', (req,res) => {
    const id = req.params.productID;

    res.status(200).send({
        msg: `ahí va el producto ${id} solicitado`,
        productID: id
    })
});

app.post('/api/product', (req,res) => {
    const miProducto = req.body;
    console.log(miProducto);

    //aqui vendría mi logica de negocio

    res.status(200).send({
        msg: "he creado un producto",
        producto: miProducto
    })
});

app.put('/api/product/:productID', (req,res) => {
    const id = req.params.productID;
    const newProduct = req.body;

    //mi log de negocio

    res.status(200).send({
        msg: "he actualizado tu registro",
        newProduct: newProduct //realment es el q m'han manat
    })
});

app.delete('/api/product/:productID', (req,res) => {
    const id = req.params.productID;

    //mi log d negoci

    res.status(200).send({
        msg: "he eliminado el producto indicado",
        producto: id
    })
});

app.listen(port, () => {
    console.log(`API REST CRUD ejecutándose en http://localhost:${port}/api/product`);
});