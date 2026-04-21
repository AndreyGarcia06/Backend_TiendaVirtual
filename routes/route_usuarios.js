const usuarioController = require('../controller/controllers_usuario')
const { requireAuth, requireRole } = require('../middleware/auth')
module.exports = (app) => {
    app.get('/api/usuarios', requireAuth, requireRole('admin'), usuarioController.list);
    app.get('/api/usuarios/:id', requireAuth, requireRole('admin'), usuarioController.find);
    app.post('/api/usuarios/login', usuarioController.login);
    app.post('/api/usuarios/registro', usuarioController.registerPublic);
    app.post('/api/usuarios', requireAuth, requireRole('admin'), usuarioController.create);
    app.put('/api/usuarios/:id', requireAuth, requireRole('admin'), usuarioController.update);
    app.delete('/api/usuarios/:id', requireAuth, requireRole('admin'), usuarioController.delete);
}