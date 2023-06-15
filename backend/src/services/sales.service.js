const { salesModel } = require('../models');
const schema = require('./validations/valuesValidate');

async function getAll() {
    const result = await salesModel.getAll();
    return result;
}

async function getProductById(id) {
    const result = await salesModel.getProductById(id);
    if (result.length === 0) return { message: 'Sale not found' };
    return result;
}

async function createSale(product) {
    const validationResult = await schema.validateSale(product);
    if (validationResult.message) {
      return validationResult;
    }
  
    const saleId = await salesModel.createSaleId();
    const salePromises = product.map((p) =>
      salesModel.createSale(saleId, p.productId, p.quantity)
        .catch((error) => ({ message: error.message })));
    
    const saleResult = await Promise.all(salePromises);
    const object = {
      id: saleId,
      itemsSold: saleResult,
    };
    
    return object;
  }

  const deleteSale = async (sale) => {
    const result = await salesModel.getProductById(sale);
    if (result.length === 0) {
      return { message: 'Sale not found' };
    }
  
    return salesModel.deleteSale(sale)
      .catch((error) => ({ message: error.message }));
  };
  
  module.exports = { getAll, getProductById, createSale, deleteSale };
