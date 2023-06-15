const { productsModel } = require('../models');
const schema = require('./validations/valuesValidate');

async function getAll() {
    const result = await productsModel.getAll();
    return result;
}

async function getProductById(id) {
    const result = await productsModel.getProductById(id);
    if (!result) return { message: 'Product not found' };
    return result;
}

async function insertProduct(name) {
    const validationResult = await schema.validateName(name);
    if (validationResult.message) {
        return validationResult;
    }
    const newProductId = await productsModel.insertProduct(name);
    const newProduct = await productsModel.getProductById(newProductId);

    return newProduct;
}

async function updateProduct(name, productId) {
    const validationResult = await schema.validateName(name);
    if (validationResult.message) {
        return validationResult;
    }
    await productsModel.updateProduct(name, productId);
    const updatedProduct = await productsModel.getProductById(productId);

    return updatedProduct;
}

async function deleteProduct(productId) {
    await productsModel.deleteProduct(productId);
}

module.exports = { getAll, getProductById, insertProduct, updateProduct, deleteProduct };