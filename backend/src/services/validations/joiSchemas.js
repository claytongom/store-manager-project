const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const productSchema = Joi.object({
    productId: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required(),
  });
  
  const saleSchema = Joi.array().items(productSchema);
  
  module.exports = {
    nameSchema,
    productSchema,
    saleSchema,
  };