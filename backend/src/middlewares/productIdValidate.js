const { productsModel } = require('../models');

async function checkProductExists(req, res, next) {
  const { id } = req.params;
  const products = await productsModel.getAll();
  const productsId = products.map((p) => p.id);
  if (!productsId.includes(+id)) {
    return res.status(404).json({ message: 'Product not found' }); 
  }
  
  return next();
}

module.exports = checkProductExists;
