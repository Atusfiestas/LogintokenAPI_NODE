const Orden = require('../models/Orden');

exports.nuevoOrden = async (req, res, next) => {
    const orden = new Orden(req.body);
    try {
        await orden.save();
        res.json({ mensaje: 'Se agregó una nueva orden' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Muestra todos las ordenes
exports.mostrarOrdenes = async (req, res, next) => {
    try {
        const ordenes = await Orden.find({})
            .populate('cliente', '-password')
            .populate('orden.servicio');
        res.json(ordenes);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra una orden por su ID
exports.mostrarOrden = async (req, res, next) => {
    try {
        const orden = await Orden.findById(req.params.idOrden)
            .populate('cliente', '-password')
            .populate('orden.servicio');

        if(!orden) {
            res.json({mensaje : 'Esta orden no existe'});
            return next();
        }
        res.json(orden);
    } catch (error) {
        console.log(error);
        next();
    }
}; 

// Actualizar la orden via ID
exports.actualizarOrden = async (req, res, next) => {
    try {
        const orden = await Orden.findOneAndUpdate({_id: req.params.idOrden}, req.body, {new: true})
            .populate('cliente', '-password')
            .populate('orden.servicio');

        res.json(orden);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Elimina una orden por su ID
exports.eliminarOrden = async (req, res, next) => {
    try {
        await Orden.findByIdAndDelete(req.params.idOrden);
        res.json({ mensaje : 'La orden se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};