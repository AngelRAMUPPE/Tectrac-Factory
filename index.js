const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

const uri = 'mongodb+srv://admin:Contrase%C3%B1aChingona123@cluster0.3o5c1iv.mongodb.net/' //Dirección de conexión
const dbname = 'Tectrac-Factory'; 
const collectionName = 'Maquinas';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/public')));

//Ruta para manejar la solicitud de inserción de datps
app.post('/insertar', async (req, res) => {
    const data = req.body;
    console.log(data);
    const client = new MongoClient(uri);

    try{
        client.connect();
        const database = client.db(dbname);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(data);
        console.log('Se insertó un documento con el ID: ' + result.insertedId);
        res.send('Datos inseratados correctamente');
    }
    catch (error)
    {
        console.error('Error al insertar datos: ', error);
        res.status(500).send('Error al insertar datos');
    }
    finally
    {
        await client.close();
    }
});
//Ruta para servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//Ruta para servir la página de maquinas
app.get('/maquinas', (req, res) => {
    res.sendFile(__dirname + '/maquinas.html');
});
//Ruta para servir la página de registrar
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});
//Ruta para servir la página de login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
//Ruta para servir la página de login
app.get('/perfil', (req, res) => {
    res.sendFile(__dirname + '/profile.html');
});
//Iniciar el servidor
app.listen(PORT, () =>
{
    console.log('Servidor corriendo en: http://localhost:' + PORT);
})
