const Servicio = require('../models/Servicio');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path'); // Asegúrate de importar 'path'

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadsDir = path.join(__dirname, '../uploads'); // Usar path.join para asegurar compatibilidad SO
            cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    }
};

const upload = multer(configuracionMulter).single('imagen');

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error.message });
        }
        return next();
    });
};

exports.nuevoServicio = async (req, res, next) => {
    const servicio = new Servicio(req.body);

    try {
        if (req.file) {
            servicio.imagen = req.file.filename;
        }
        await servicio.save();
        res.json({ mensaje: 'Se agregó un nuevo servicio' });
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarServicios = async (req, res, next) => {
    try {
        const servicios = await Servicio.find({});
        res.json(servicios);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.mostrarServicio = async (req, res, next) => {
    try {
        const servicio = await Servicio.findById(req.params.idServicio);

        if (!servicio) {
            res.json({ mensaje: 'Ese servicio no existe' });
            return next();
        }

        res.json(servicio);
    } catch (error) {
        console.log('Error al buscar el servicio:', error);
        next();
    }
};



exports.actualizarServicio = async (req, res, next) => {
    try {
        let nuevoServicio = req.body;

        if (req.file) {
            nuevoServicio.imagen = req.file.filename;
        } else {
            let servicioAnterior = await Servicio.findById(req.params.idServicio
            );
            nuevoServicio.imagen = servicioAnterior.imagen;
        }

        let servicio = await Servicio.findOneAndUpdate({ _id: req.params.idServicio }, nuevoServicio, {
            new: true
        });

        res.json(servicio);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.eliminarServicio = async (req, res, next) => {
    try {
        await Servicio.findByIdAndDelete({ _id: req.params.idServicio });
        res.json({ mensaje: 'El Servicio se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.buscarServicio = async (req, res, next) => {
    try {
        const { query } = req.params;
        const servicio = await Servicio.find({ nombre: new RegExp(query, 'i') });
        res.json(servicio);
    } catch (error) {
        console.log(error);
        next();
    }
};