const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/public')));


//Ruta para servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//Ruta para servir la página de maquinas
app.get('/maquinas', (req, res) => {
    res.sendFile(__dirname + '/maquinas.html');
});

//Iniciar el servidor
app.listen(PORT, () =>
{
    console.log('Servidor corriendo en: http://localhost:' + PORT);
})