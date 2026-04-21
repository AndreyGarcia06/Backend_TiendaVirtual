'use strict';

const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || 'tienda_virtual_secret_dev';

const requireAuth = (req, res, next) => {
    const authorization = req.headers.authorization || '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;

    if (!token) {
        return res.status(401).send({ mensaje: 'Token requerido' });
    }

    try {
        req.user = jwt.verify(token, getJwtSecret());
        return next();
    } catch (error) {
        return res.status(401).send({ mensaje: 'Token invalido' });
    }
};

const requireRole = (role) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ mensaje: 'Token requerido' });
    }

    if (req.user.rol !== role) {
        return res.status(403).send({ mensaje: 'Acceso denegado' });
    }

    return next();
};

module.exports = {
    requireAuth,
    requireRole,
};