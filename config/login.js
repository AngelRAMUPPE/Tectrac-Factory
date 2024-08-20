const mongoose = require('mongoose');
const express = require('express');
const Usuario = require('./models/usuario');
const path = require('path');
const app = express();

//Conexión a la BD.
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas [Login]'))
    .catch(err => console.error('Error al conectar: ', err));

//Middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configuración de la vista.
app.set('vistas', path.join(__dirname, 'vistas'));
app.set('Engine', 'html');

app.get('./login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});    

app.post('/login', async (req, res) =>{ 
    const {correo, contraseña} = req.body;
    const usuarioPorongoso = await Usuario.findOne({Correo:correo});
    // console.log(usuarioPorongoso);
    if (!usuarioPorongoso){
        console.log('Correo no encontrado');
    } else if (contraseña === usuarioPorongoso.Contraseña)
    {
        console.log('¡Éxito!'); 
        res.redirect('/maquinas')
    }
    else
    {
        res.send('Contraseña errónea');
    }
})

//Exporta todo el documento.
module.exports=app;