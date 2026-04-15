const Sequelize = require('sequelize');
const db = require('../models');
const carrito = db.tbb_carritos

module.exports = {
    create(req, res) {
        return carrito
        .create({
            fecha_creacion: req.body.fecha_creacion,
            total: req.body.total,
            id_usuario: req.body.id_usuario
        })
        .then(carrito => res.status(200).send(carrito))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return carrito.findAll({})
        .then(carritos => res.status(200).send(carritos))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return carrito.findByPk(req.params.id)
        .then(carritoEncontrado => {
            if (!carritoEncontrado) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }
            return res.status(200).send(carritoEncontrado);
        })
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return carrito.update({
            fecha_creacion: req.body.fecha_creacion,
            total: req.body.total,
            id_usuario: req.body.id_usuario
        }, {
            where: {
                id: req.params.id,
            }
        })
        .then(([filasActualizadas]) => {
            if (!filasActualizadas) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }
            return res.status(200).send({mensaje: "Datos actualizados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return carrito.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then(filasEliminadas => {
            if (!filasEliminadas) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }
            return res.status(200).send({mensaje: "Datos eliminados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
}
