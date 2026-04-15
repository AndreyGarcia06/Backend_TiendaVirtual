const detalleController = require('../controller/controllers_carrito_detalle')
module.exports = (app) => {
    app.get('/api/carrito-detalle', detalleController.list);
    app.get('/api/carrito-detalle/:id', detalleController.find);
    app.post('/api/carrito-detalle', detalleController.create);
    app.put('/api/carrito-detalle/:id', detalleController.update);
    app.delete('/api/carrito-detalle/:id', detalleController.delete);
}