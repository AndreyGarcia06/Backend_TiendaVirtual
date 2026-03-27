const Sequelize = require('sequelize');
const carritoDetalle = require('../models/tbd_carrito_detalle');
const { tbd_carrito_detalle: detalle } = require('../models');

module.exports = {
    create(req, res) {
        return detalle
        .create({
            id_carrito: req.body.id_carrito,
            precio_unitario: req.body.precio_unitario,
            cantidad: req.body.cantidad,
            id_producto: req.body.id_producto
        })
        .then(detalle => res.status(201).send(detalle))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return detalle.findAll({})
        .then(detalles => res.status(200).send(detalles))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return detalle.findAll({
            where: {
                id_carrito: req.params.id_carrito,
            }
        })
        .then(detalle => res.status(200).send(detalle))
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
                id_carrito: req.params.id_carrito,
            }
        })
        .then(detalle => res.status(200).send(detalle))
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return detalle.destroy({
            where: {
                id_carrito: req.params.id_carrito,
            }
        })
        .then(detalle => res.status(200).send(detalle))
        .catch(error => res.status(400).send(error));
    },
}
