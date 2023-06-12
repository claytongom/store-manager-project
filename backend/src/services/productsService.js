const productsModel = require('../models/productsModel');

const getAll = () => productsModel.getAll()
    .then((result) => result)
    .catch((error) => {
        throw error;
    });

const getById = (id) => productsModel.getById(id)
    .then((result) => result || { message: 'Product not found' })
    .catch((error) => {
        throw error;
    });

const createNewProduct = (name) => productsModel.createNewProduct(name);

module.exports = {
    getAll,
    getById,
    createNewProduct,
};