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
        const criterio = req.params.id;
        const esIdNumerico = /^\d+$/.test(criterio);

        const busqueda = esIdNumerico
            ? producto.findByPk(criterio)
            : producto.findOne({ where: { nombre: criterio } });

        return busqueda
            .then(productoEncontrado => {
                if (!productoEncontrado) {
                    return res.status(404).send({ mensaje: 'Producto no encontrado' });
                }
                return res.status(200).send(productoEncontrado);
            })
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
                id: req.params.id,
            }
        })
        .then(([filasActualizadas]) => {
            if (!filasActualizadas) {
                return res.status(404).send({ mensaje: 'Producto no encontrado' });
            }
            return res.status(200).send({mensaje: "Datos actualizados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return producto.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then(filasEliminadas => {
            if (!filasEliminadas) {
                return res.status(404).send({ mensaje: 'Producto no encontrado' });
            }
            return res.status(200).send({mensaje: "Datos eliminados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
}
