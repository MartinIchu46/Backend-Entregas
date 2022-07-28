const express = require('express');
const moment = require ('moment');

const fs =require('fs');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando ${server.address().port} usando express`);

})
try {
    const productos = fs.readFileSync('./entrega3/productos.txt','utf-8');
console.log({productos})
} catch(error) {
    throw new Error('Ocurrio un error')
}



app.get('/', (req, res) => {
    res.send('hola mundo')
})

app.get('/productos', (solicitud, respuesta) => {
    respuesta.send(`${productos}`)
})
 let visitas =0;
app.get('/productoRandom', (req, res) => {
    let prodRandom = productos[Math.random()];
    res.send(`El producto es ${prodRandom}`)
})


server.on("error", e => console.log(`Error en servidor ${e}`))

