const Sequelize = require('sequelize');
const db = require('../models');
const detalle = db.tbd_carrito_detalle

module.exports = {
    create(req, res) {
        return detalle
        .create({
            id_carrito: req.body.id_carrito,
            precio_unitario: req.body.precio_unitario,
            cantidad: req.body.cantidad,
            id_producto: req.body.id_producto
        })
        .then(detalle => res.status(200).send(detalle))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return detalle.findAll({})
        .then(detalles => res.status(200).send(detalles))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return detalle.findByPk(req.params.id)
        .then(detalleEncontrado => {
            if (!detalleEncontrado) {
                return res.status(404).send({ mensaje: 'Detalle no encontrado' });
            }
            return res.status(200).send(detalleEncontrado);
        })
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return detalle.update({
            id_carrito: req.body.id_carrito,
            precio_unitario: req.body.precio_unitario,
            cantidad: req.body.cantidad,
            id_producto: req.body.id_producto
        }, {
            where: {
                id: req.params.id,
            }
        })
        .then(([filasActualizadas]) => {
            if (!filasActualizadas) {
                return res.status(404).send({ mensaje: 'Detalle no encontrado' });
            }
            return res.status(200).send({mensaje: "Datos actualizados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return detalle.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then(filasEliminadas => {
            if (!filasEliminadas) {
                return res.status(404).send({ mensaje: 'Detalle no encontrado' });
            }
            return res.status(200).send({mensaje: "Datos eliminados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
}
