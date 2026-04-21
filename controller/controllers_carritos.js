const Sequelize = require('sequelize');
const db = require('../models');
const carrito = db.tbb_carritos
const detalle = db.tbd_carrito_detalle;
const producto = db.tbb_productos;

const construirRespuestaCarrito = async (carritoEncontrado) => {
    if (!carritoEncontrado) {
        return { carrito: null, items: [] };
    }

    const detallesCarrito = await detalle.findAll({
        where: { id_carrito: carritoEncontrado.id },
    });

    const productosIds = detallesCarrito.map((item) => item.id_producto);
    const productosEncontrados = productosIds.length
        ? await producto.findAll({ where: { id: productosIds } })
        : [];

    const productosPorId = new Map(productosEncontrados.map((item) => [String(item.id), item]));

    const items = detallesCarrito.map((item) => {
        const productoRelacionado = productosPorId.get(String(item.id_producto));
        return {
            ...item.toJSON(),
            producto: productoRelacionado ? productoRelacionado.toJSON() : null,
        };
    });

    return {
        carrito: carritoEncontrado,
        items,
    };
};

const recalcularTotalCarrito = async (carritoId, transaction) => {
    const detallesCarrito = await detalle.findAll({
        where: { id_carrito: carritoId },
        transaction,
    });

    const total = detallesCarrito.reduce((acumulado, item) => {
        return acumulado + (Number(item.precio_unitario || 0) * Number(item.cantidad || 0));
    }, 0);

    await carrito.update({ total }, {
        where: { id: carritoId },
        transaction,
    });

    return total;
};

module.exports = {
    async addItem(req, res) {
        const cantidadSolicitada = Number(req.body.cantidad || 1);
        const idProducto = Number(req.body.id_producto);

        if (!idProducto || Number.isNaN(cantidadSolicitada) || cantidadSolicitada <= 0) {
            return res.status(400).send({ mensaje: 'Producto o cantidad invalidos' });
        }

        const transaction = await db.sequelize.transaction();

        try {
            const productoEncontrado = await producto.findByPk(idProducto, { transaction });
            if (!productoEncontrado) {
                await transaction.rollback();
                return res.status(404).send({ mensaje: 'Producto no encontrado' });
            }

            const carritoUsuario = await carrito.findOne({
                where: { id_usuario: req.user.id },
                order: [['id', 'DESC']],
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            const carritoActivo = carritoUsuario || await carrito.create({
                fecha_creacion: new Date(),
                total: 0,
                id_usuario: req.user.id,
            }, { transaction });

            const detalleExistente = await detalle.findOne({
                where: {
                    id_carrito: carritoActivo.id,
                    id_producto: productoEncontrado.id,
                },
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            const precioUnitario = Number(productoEncontrado.precio || 0);
            const subtotal = precioUnitario * cantidadSolicitada;

            if (detalleExistente) {
                await detalle.update({
                    cantidad: Number(detalleExistente.cantidad || 0) + cantidadSolicitada,
                    precio_unitario: precioUnitario,
                }, {
                    where: { id: detalleExistente.id },
                    transaction,
                });
            } else {
                await detalle.create({
                    id_carrito: carritoActivo.id,
                    precio_unitario: precioUnitario,
                    cantidad: cantidadSolicitada,
                    id_producto: productoEncontrado.id,
                }, { transaction });
            }

            const totalActual = Number(carritoActivo.total || 0) + subtotal;

            await carrito.update({
                total: totalActual,
            }, {
                where: { id: carritoActivo.id },
                transaction,
            });

            const carritoActualizado = await carrito.findByPk(carritoActivo.id, { transaction });
            const payload = await construirRespuestaCarrito(carritoActualizado);

            await transaction.commit();

            return res.status(200).send({
                mensaje: 'Producto agregado al carrito',
                carrito: payload.carrito,
                items: payload.items,
            });
        } catch (error) {
            await transaction.rollback();
            return res.status(400).send(error);
        }
    },
    async removeMyItem(req, res) {
        const idDetalle = Number(req.params.idDetalle);
        if (!idDetalle) {
            return res.status(400).send({ mensaje: 'Detalle invalido' });
        }

        const transaction = await db.sequelize.transaction();

        try {
            const carritoEncontrado = await carrito.findOne({
                where: { id_usuario: req.user.id },
                order: [['id', 'DESC']],
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            if (!carritoEncontrado) {
                await transaction.rollback();
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }

            const detalleEncontrado = await detalle.findOne({
                where: {
                    id: idDetalle,
                    id_carrito: carritoEncontrado.id,
                },
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            if (!detalleEncontrado) {
                await transaction.rollback();
                return res.status(404).send({ mensaje: 'Detalle no encontrado' });
            }

            await detalle.destroy({
                where: { id: idDetalle },
                transaction,
            });

            await recalcularTotalCarrito(carritoEncontrado.id, transaction);

            const carritoActualizado = await carrito.findByPk(carritoEncontrado.id, { transaction });
            const payload = await construirRespuestaCarrito(carritoActualizado);

            await transaction.commit();

            return res.status(200).send({
                mensaje: 'Producto eliminado del carrito',
                carrito: payload.carrito,
                items: payload.items,
            });
        } catch (error) {
            await transaction.rollback();
            return res.status(400).send(error);
        }
    },
    async mine(req, res) {
        try {
            const carritoEncontrado = await carrito.findOne({
                where: { id_usuario: req.user.id },
                order: [['id', 'DESC']],
            });

            const payload = await construirRespuestaCarrito(carritoEncontrado);
            return res.status(200).send(payload);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
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
