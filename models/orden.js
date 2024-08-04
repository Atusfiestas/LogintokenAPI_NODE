const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ordenesSchema = new Schema({
    cliente: {
        type: Schema.ObjectId, 
        ref: 'User',  
        required: true
    },
    orden: [{
        servicio: {
            type: Schema.ObjectId,
            ref: 'Servicio',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'PAGADO', 'ENVIADO'],
        default: 'PENDIENTE'
    },
// Datos para el envio del servicio
    paymentCode: {
        type: Number,
        required: true
    },    
    nombreDestinatarioEnvio: {
        type: String,
        required: true
    },
    telefonoDestinatarioEnvio: {
        type: String,
        required: true
    },
    direccionDestinatarioEnvio: {
        type: String,
        required: true
    },
    barrioDestinatarioEnvio: {
        type: String,
        required: true
    },
    municipioDestinatarioEnvio: {
        type: String,
        required: true
    },
    departamentoDestinatarioEnvio: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // Para tener campos createdAt y updatedAt
});

module.exports = mongoose.model('Orden', ordenesSchema);