const express = require('express')
const { Router } = express;

const router = Router();

const productos = [
    {
        title: '',
        price: 2,
        thumbnauk: '',
    },
    
]

router.get('/', (req, res) => {
    res.send(productos)
});

router.put
 
router.post('/', (req, res) => {
    const productosGuardar = req.body;
    productos.push(productosGuardar);
    res.status(201).send({status: 'ok'})
});
 

module.exports = router;