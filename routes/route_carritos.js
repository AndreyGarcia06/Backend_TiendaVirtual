const carritoController = require('../controller/controllers_carritos')
const { requireAuth, requireRole } = require('../middleware/auth')
module.exports = (app) => {
    app.get('/api/carritos/mio', requireAuth, carritoController.mine);
    app.post('/api/carritos/mio/agregar', requireAuth, carritoController.addItem);
    app.delete('/api/carritos/mio/item/:idDetalle', requireAuth, carritoController.removeMyItem);
    app.get('/api/carritos', requireAuth, requireRole('admin'), carritoController.list);
    app.get('/api/carritos/:id', requireAuth, requireRole('admin'), carritoController.find);
    app.post('/api/carritos', requireAuth, requireRole('admin'), carritoController.create);
    app.put('/api/carritos/:id', requireAuth, requireRole('admin'), carritoController.update);
    app.delete('/api/carritos/:id', requireAuth, requireRole('admin'), carritoController.delete);
}