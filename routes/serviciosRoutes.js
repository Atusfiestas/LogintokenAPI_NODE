const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');

// Nuevos servicios
router.post('/servicios', 
    serviciosController.subirArchivo,
    serviciosController.nuevoServicio
);

// Muestra todos los servicios
router.get('/servicios', 
    serviciosController.mostrarServicios);

// Muestra un servicio específico por su ID
router.get('/servicios/:idServicios', 
    serviciosController.mostrarServicio);

// Actualizar servicios
router.put('/servicios/:idServicio', 
    serviciosController.subirArchivo,
    serviciosController.actualizarServicio
);

// Eliminar Servicios
router.delete('/servicios/:idServicio', 
    serviciosController.eliminarServicio
);

// Búsqueda de servicios
router.post('/servicios/busqueda/:query',
    serviciosController.buscarServicio);

module.exports = router;
