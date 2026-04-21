const productoController = require('../controller/controllers_productos')
const { requireAuth, requireRole } = require('../middleware/auth')
module.exports = (app) => {
    app.get('/api/productos', productoController.list);
    app.get('/api/productos/:id', productoController.find);
    app.post('/api/productos', requireAuth, requireRole('admin'), productoController.create);
    app.put('/api/productos/:id', requireAuth, requireRole('admin'), productoController.update);
    app.delete('/api/productos/:id', requireAuth, requireRole('admin'), productoController.delete);
}