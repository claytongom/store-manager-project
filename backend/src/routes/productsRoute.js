const { Router } = require('express');
const productsController = require('../controllers/productsController');
const { validateProduct } = require('../middlewares/validateProduct');

const productsRoute = Router();

productsRoute.get('/', productsController.getAll);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', validateProduct, productsController.createNewProduct);

module.exports = productsRoute;
