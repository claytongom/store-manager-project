const { productsModel } = require('../models');

const validateProductData = async (req, res, next) => {
  const product = req.body;
  const products = await productsModel.getAll();
  const productsId = products.map((p) => p.id);

  const missingProductId = product.some((p) => !Object.keys(p).includes('productId'));
  const missingQuantity = product.some((p) => !Object.keys(p).includes('quantity'));
  const invalidProductIds = product.some((p) =>
  p.productId <= 0 || !productsId.includes(p.productId));

  if (missingProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (missingQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (invalidProductIds) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return next();
};

module.exports = validateProductData;
