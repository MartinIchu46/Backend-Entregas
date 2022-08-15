const express = require('express');
const productos = require('./modulos/productos');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/productos', (req, res) => res.send({productos}))

app.get('/api/productos:id', (req, res) => {
    const {id} = req.params;
    if(isNaN(id)) {
        res.status(400).send({error: 'El parametro no es un número'});
        return 
    }
    if (id > productos.length){
        res.status(400).send({error: 'El parametro está fuera de rango'});
        return
    }
    res.send({productos:[id]})
});

app.listen(8080, () => console.log('Servidor OK puerto 8080'));