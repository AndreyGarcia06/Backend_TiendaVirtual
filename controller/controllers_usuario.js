const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require('../models');
const usuario = db.tbc_usuario;

module.exports = {
    create(req, res) {
        return usuario
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
    login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ mensaje: 'Email y password son obligatorios' });
        }

        return usuario.findOne({ where: { email } })
            .then(usuarioEncontrado => {
                if (!usuarioEncontrado) {
                    return res.status(401).send({ mensaje: 'Credenciales invalidas' });
                }

                if (usuarioEncontrado.password !== password) {
                    return res.status(401).send({ mensaje: 'Credenciales invalidas' });
                }

                const jwtSecret = process.env.JWT_SECRET || 'tienda_virtual_secret_dev';
                const token = jwt.sign(
                    {
                        id: usuarioEncontrado.id,
                        email: usuarioEncontrado.email,
                        rol: usuarioEncontrado.rol,
                    },
                    jwtSecret,
                    { expiresIn: '2h' }
                );

                return res.status(200).send({
                    token
                });
            })
            .catch(error => res.status(400).send(error));
    },
    list(_, res) {
        return usuario.findAll({})
        .then(usuarios => res.status(200).send(usuarios))
        .catch(error => res.status(400).send(error));
    },
    find(req, res) {
        const criterio = req.params.id;
        const esIdNumerico = /^\d+$/.test(criterio);

        const busqueda = esIdNumerico
            ? usuario.findByPk(criterio)
            : usuario.findOne({ where: { nombre: criterio } });

        return busqueda
            .then(usuarioEncontrado => {
                if (!usuarioEncontrado) {
                    return res.status(404).send({ mensaje: 'Usuario no encontrado' });
                }
                return res.status(200).send(usuarioEncontrado);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return usuario.update({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol,
            fecha_registro: req.body.fecha_registro
        }, {
            where: {
                id: req.params.id,
            }
        })
        .then(([filasActualizadas]) => {
            if (!filasActualizadas) {
                return res.status(404).send({ mensaje: 'Usuario no encontrado' });
            }
            return res.status(200).send({mensaje: "Datos actualizados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return usuario.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then(filasEliminadas => {
            if (!filasEliminadas) {
                return res.status(404).send({ mensaje: 'Usuario no encontrado' });
            }
            return res.status(200).send({mensaje: "Datos eliminados correctamente"});
        })
        .catch(error => res.status(400).send(error));
    },
}
