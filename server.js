const express = require('express');
const conectarDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productosroutes =require('./routes/productosroutes'); //importar rutas de productos
const pedidosroutes =require('./routes/pedidosroutes'); //importar rutas de pedidos

// Conectar a la base de datos
conectarDB();

// Crear una instancia de Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Usar rutas de autenticación
app.use('/api/auth', authRoutes);

//rutas de productos
app.use('/api',productosroutes); //usar rutas de productos
app.use('/api',pedidosroutes); //usar rutas de pedidos

// Configurar el puerto en el que escuchará el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});