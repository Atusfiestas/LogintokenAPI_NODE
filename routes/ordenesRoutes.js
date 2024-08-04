const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesController');


// Nuevos ordenes
router.post('/ordenes/nuevo', ordenesController.nuevoOrden);

// Muestra todos las ordenes
router.get('/ordenes', ordenesController.mostrarOrdenes);

// Muestra una orden por su ID
router.get('/ordenes/:idOrden', ordenesController.mostrarOrden);


// Actualizar ordenes
router.put('/ordenes/:idOrden', ordenesController.actualizarOrden);

// Elimina una orden
router.delete('/ordenes/:idOrden', ordenesController.eliminarOrden);

module.exports = router;