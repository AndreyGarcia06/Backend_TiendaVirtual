const categoriaController = require('../controller/controllers_categoria')
const { requireAuth, requireRole } = require('../middleware/auth')
module.exports = (app) => {
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categorias/:id', categoriaController.find);
    app.post('/api/categorias', requireAuth, requireRole('admin'), categoriaController.create);
    app.put('/api/categorias/:id', requireAuth, requireRole('admin'), categoriaController.update);
    app.delete('/api/categorias/:id', requireAuth, requireRole('admin'), categoriaController.delete);
}