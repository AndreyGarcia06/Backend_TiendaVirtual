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
                nombre: req.params.id
            }
        })
        .then(categoria => res.status(200).send({mensaje: "Datos actualizados correctamente"}))
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return categoria.destroy({
            where: {
                nombre: req.params.id
            }
        })
        .then(categoria => res.status(200).send({mensaje: "Datos eliminados correctamente"}))
        .catch(error => res.status(400).send(error));
    }
};