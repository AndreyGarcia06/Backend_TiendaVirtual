const Sequelize = require('sequelize');
const db = require('../models');
const producto = db.tbb_productos

module.exports = {
    create(req, res) {
        return producto
        .create({
            nombre: req.body.nombre,
            description: req.body.description,
            precio: req.body.precio,
            stock: req.body.stock,
            id_categoria: req.body.id_categoria
        })
        .then(producto => res.status(200).send(producto))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return producto.findAll({})
        .then(productos => res.status(200).send(productos))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return producto.findAll({
            where: {
                nombre: req.params.nombre,
            }
        })
        .then(producto => res.status(200).send(producto))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return producto.update({
            nombre: req.body.nombre,
            description: req.body.description,
            precio: req.body.precio,
            stock: req.body.stock,
            id_categoria: req.body.id_categoria
        }, {
            where: {
                nombre: req.params.nombre,
            }
        })
        .then(producto => res.status(200).send({mensaje: "Datos actualizados correctamente"}))
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return producto.destroy({
            where: {
                nombre: req.params.nombre,
            }
        })
        .then(producto => res.status(200).send({mensaje: "Datos eliminados correctamente"}))
        .catch(error => res.status(400).send(error));
    },
}
