const { productsService } = require('../services');

async function getAll(req, res) {
  const result = await productsService.getAll();
  res.status(200).json(result);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const result = await productsService.getProductById(id);
  if (result.message) {
    return res.status(404).json(result);
  } 
    return res.status(200).json(result);
}

async function insertProduct(req, res) {
  const { name } = req.body;
  const result = await productsService.insertProduct(name);
  if (!name) {
    return res.status(400).json(result);
  } if (result.message) {
    return res.status(422).json(result);
  } 
    return res.status(201).json(result);
}
  
async function updateProduct(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  const result = await productsService.updateProduct(name, id);
  if (result.message) {
    return res.status(422).json(result);
  } 
    return res.status(200).json(result);
}
  
async function deleteProduct(req, res) {
  const { id } = req.params;
  await productsService.deleteProduct(id);
  res.sendStatus(204);
}

async function findByName(req, res) {
  const { q } = req.query;
  const result = await productsService.findByName(q);
  res.status(200).json(result);
}
  
  module.exports = { 
    getAll,
    getProductById,
    insertProduct,
    updateProduct,
    deleteProduct,
    findByName,
  };