const { salesService } = require('../services');

async function getAll(req, res) {
    const result = await salesService.getAll();
    res.status(200).json(result);
  }  

  async function getProductById(req, res) {
    const { id } = req.params;
    const result = await salesService.getProductById(id);
    if (result.message) {
      return res.status(404).json(result);
    } 
      return res.status(200).json(result);
  }

  async function createSale(req, res) {
    const product = req.body;
    const result = await salesService.createSale(product);
    if (result.message) {
      return res.status(422).json(result);
    } 
      return res.status(201).json(result);
  }

  async function deleteSale(req, res) {
    const { id } = req.params;
    const result = await salesService.deleteSale(id);
    if (result.message) {
      return res.status(404).json(result);
    } 
      return res.sendStatus(204);
  }

module.exports = {
    getAll,
    getProductById,
    createSale,
    deleteSale,
};