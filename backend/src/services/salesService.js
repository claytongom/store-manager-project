const salesModel = require('../models/salesModel');

const getAll = async () => {
  try {
    const result = await salesModel.getAll();
    return result;
  } catch (error) {
    throw new Error('Failed to retrieve sales data');
  }
};

const getById = async (id) => {
  try {
    const result = await salesModel.getById(id);
    if (result.length === 0) return { message: 'Sale not found' };
    return result;
  } catch (error) {
    throw new Error('Failed to retrieve sale by ID');
  }
};

module.exports = {
  getAll,
  getById,
};
