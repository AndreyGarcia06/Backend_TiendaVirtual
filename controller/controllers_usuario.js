const Sequelize = require('sequelize');
const db = require('../models');
const usuario = db.tbc_usuario;

module.exports = {
    create(req, res) {
        return usuarioModel
        .create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol,
            fecha_registro: req.body.fecha_registro
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return usuarioModel.findAll({})
        .then(usuarios => res.status(200).send(usuarios))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        return usuarioModel.findAll({
            where: {
                email: req.params.email,
            }
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return usuarioModel.update({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol,
            fecha_registro: req.body.fecha_registro
        }, {
            where: {
                email: req.params.email,
            }
        })
        .then(usuario => res.status(200).send({mensaje: "Datos actualizados correctamente"}))
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return usuarioModel.destroy({
            where: {
                email: req.params.email,
            }
        })
        .then(usuario => res.status(200).send({mensaje: "Datos eliminados correctamente"}))
        .catch(error => res.status(400).send(error));
    },
}
