const Sequelize = require('sequelize');
const db = require('../models');
const categoria = db.tbc_categorias

module.exports = {
    create(req, res) {
        return categoria
        .create({
            nombre: req.body.nombre
        })
        .then(categoria => res.status(200).send(categoria))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return categoria.findAll({})
        .then(categorias => res.status(200).send(categorias))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        const criterio = req.params.id;
        const esIdNumerico = /^\d+$/.test(criterio);

        const busqueda = esIdNumerico
            ? categoria.findByPk(criterio)
            : categoria.findOne({ where: { nombre: criterio } });

        return busqueda
            .then(categoriaEncontrada => {
                if (!categoriaEncontrada) {
                    return res.status(404).send({ mensaje: 'Categoria no encontrada' });
                }
                return res.status(200).send(categoriaEncontrada);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return categoria.update({
            nombre: req.body.nombre
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(([filasActualizadas]) => {
            if (!filasActualizadas) {
                return res.status(404).send({ mensaje: 'Categoria no encontrada' });
            }
            return res.status(200).send({mensaje: "Datos actualizados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return categoria.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(filasEliminadas => {
            if (!filasEliminadas) {
                return res.status(404).send({ mensaje: 'Categoria no encontrada' });
            }
            return res.status(200).send({mensaje: "Datos eliminados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    }
};