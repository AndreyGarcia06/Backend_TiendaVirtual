const Sequelize = require('sequelize');
const usuario = require('../models/tbc_categorias');
const { tbc_categorias: categoria } = require('../models');

module.exports = {
    create(req, res) {
        return categoria
        .create({
            nombre: req.params.nombre
        })
        .then(categoria => res.status(201).send(categoria))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return categoria.findAll({})
        .then(categorias => res.status(200).send(categorias))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return categoria.findAll({
            where: {
                nombre: req.params.nombre,
            }
        })
        .then(categoria => res.status(200).send(categoria))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return categoria.update({
            nombre: req.body.nombre
        }, {
            where: {
                nombre: req.params.nombre,
            }
        })
        .then(categoria => res.status(200).send(categoria))
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return categoria.destroy({
            where: {
                nombre: req.params.nombre,
            }
        })
        .then(categoria => res.status(200).send(categoria))
        .catch(error => res.status(400).send(error));
    },
}