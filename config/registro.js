const mongoose = require('mongoose');
const express = require('express');
require('./models/usuario.js');
const Usuario = mongoose.model('Usuario');
const app = express();

//Conexión a la bd.
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar con MongoDB Atlas:', err));

//Middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('./register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

//Ruta pa' el usuario. Y ya funciona yes.
app.post('/crear-usuario', async (req, res) => {
    const {
        nombre,
        apellidos,
        correo,
        contraseña,
        celular
    } = req.body
    try
    {
        const nuevoUsuario = new Usuario({
            Nombre: nombre,
            Apellidos: apellidos,
            Correo: correo,
            Contraseña: contraseña,
            Celular: celular
        })

        nuevoUsuario.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error al añadir usuario:', err);
            res.status(500).send('Error al añadir usuario: ' + err);
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }

    
});
//Exporta todo el documento.
module.exports=app;