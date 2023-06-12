const productsService = require('../services/productsService');

const getAll = (req, res) => {
    productsService.getAll()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({ message: 'Erro ao obter os produtos.' });
        });
};

const getById = (req, res) => {
    const { id } = req.params;
    productsService.getById(id)
        .then((result) => {
            if (result.message) {
                res.status(404).json(result);
            } else {
                res.status(200).json(result);
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Erro ao obter o produto.' });
        });
};

const createNewProduct = (req, res) => {
    const data = req.body;
    productsService.createNewProduct(data)
      .then((newProduct) => {
        res.status(201).json(newProduct);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };  

module.exports = {
    getAll,
    getById,
    createNewProduct,   
};
