const categoriaController = require('../controller/controllers_categoria')
module.exports = (app) => {
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categorias/:id', categoriaController.find);
    app.post('/api/categorias', categoriaController.create);
    app.put('/api/categorias/:id', categoriaController.update);
    app.delete('/api/categorias/:id', categoriaController.delete);
}