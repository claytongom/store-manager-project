const { Router } = require('express');
const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/productNameValidate');
const validateProductId = require('../middlewares/productIdValidate');

const routerProduct = Router();

routerProduct.get('/', productsController.getAll);
routerProduct.get('/search', productsController.findByName);
routerProduct.get('/:id', productsController.getProductById);
routerProduct.post('/', productsController.insertProduct);
routerProduct.put('/:id', validateProductName, validateProductId, productsController.updateProduct);
routerProduct.delete('/:id', validateProductId, productsController.deleteProduct);

module.exports = routerProduct;