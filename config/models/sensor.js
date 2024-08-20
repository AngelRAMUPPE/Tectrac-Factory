const {Schema, model, default: mongoose}  = require('mongoose');


const SensorSchema = mongoose.model('Sensor', new mongoose.Schema(
    {
        ID: {type: String, required: true},
        NombreSensor: {type: String, required: true},
        Temperatura: {type: String, required: true},
        Humedad: {type: String, required: true},
        Presion: {type: String, required: true}
    }
));

module.exports=Sensor;