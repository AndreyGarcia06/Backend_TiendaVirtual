const detalleController = require('../controller/controllers_carrito_detalle')
const { requireAuth, requireRole } = require('../middleware/auth')
module.exports = (app) => {
    app.get('/api/carrito-detalle', requireAuth, requireRole('admin'), detalleController.list);
    app.get('/api/carrito-detalle/:id', requireAuth, requireRole('admin'), detalleController.find);
    app.post('/api/carrito-detalle', requireAuth, requireRole('admin'), detalleController.create);
    app.put('/api/carrito-detalle/:id', requireAuth, requireRole('admin'), detalleController.update);
    app.delete('/api/carrito-detalle/:id', requireAuth, requireRole('admin'), detalleController.delete);
}