const { Router } = require('express');
const { salesController } = require('../controllers');
const validateSale = require('../middlewares/saleValidate');

const routerSale = Router();

routerSale.get('/', salesController.getAll);
routerSale.get('/:id', salesController.getProductById);
routerSale.post('/', validateSale, salesController.createSale);
routerSale.delete('/:id', salesController.deleteSale);

module.exports = routerSale;