const express = require('express');
const productoss = require("./modulos/productos")
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express();

const httpServer = new HttpServer(app) // inicio de servidor http
const io = new IOServer(httpServer)

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./modulos'))
const productos = new productoss();

//permite reconocer lo que se envia por el ejs (formulario)
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

//EJS
app.set('views', './views');
app.set('view engine', 'ejs');

//pugs
//app.set('views', './views');
//app.set('view engine', 'pugs');

//Handlebars
// app.engine('hbs', handlebars.engine({
//     extname: '.hbs',
//     defaultLayout: 'index.hbs',
//     layoutsDir: __dirname + '/views/layouts',
//     partialsDir: __dirname + '/views/partials'
// }))

// app.set('view engine', 'hbs');
// app.set('views', './views');


//renderizando el formulario
app.get('/api/productos', (req,res) => {
    const todos= productos.getAll();
    res.send(todos);
});

app.get("/api/productos:id", (req, res) => {
    const { id } =req.params;
    if(isNaN(id)) {
        res.status(400).send({ error: "el parametro está no es un número"});
        return;
    }
    if(id > productos.lenght) {
        res.status(400).send({ error: "el parametro esta fuera de rango"});
        return;
    }
    res.send({productos: [id]});
});

//se envia a /personas los datos del formulario
app.post('/personas', (req, res) => { //query params
    datos.push(req.body) // los datos recibidos se guardan en la lista datos
    res.render('form', {productos}) // se muestran los datos
});

httpServer.listen(8080, () => console.log('servidor OK'));

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];

 io.on('connection',socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data); // se agrega el mensaje al array de mensajes
        io.sockets.emit('messages', messages); // manda los mensajes a todos los usuarios
    });
 });