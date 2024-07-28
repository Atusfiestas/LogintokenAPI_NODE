const mongoose = require('mongoose');

//funcion asincronica para conectar a la base de datos MongoDB
const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/authdb', {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });
        console.log('MongoDB conectado');
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error.message);
            process.exit(1);
        }
};

module.exports = conectarDB;