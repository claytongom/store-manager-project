const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  try {
    const result = await salesService.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.getById(id);
    if (result.message) return res.status(404).json(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getById,
};
