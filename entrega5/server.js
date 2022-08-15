const express = require('express');
const app = express();

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

const productos = {};

//renderizando el formulario
app.get('/', (req,res) => {
    res.render('form', {productos});
});

//se envia a /personas los datos del formulario
app.post('/personas', (req, res) => { //query params
    datos.push(req.body) // los datos recibidos se guardan en la lista datos
    res.render('form', {productos}) // se muestran los datos
});

app.listen(8080, () => console.log('servidor OK'));