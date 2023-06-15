const { nameSchema, saleSchema } = require('./joiSchemas');

const validateName = (name) => {
  const { error } = nameSchema.validate({ name }, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join('; ');
    return { message: errorMessage };
  }

  return { message: null };
};

const validateSale = (product) => {
  const { error } = saleSchema.validate(product, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((detail) =>
    detail.message.replace(/\[\d\]./, '')).join('; ');
    return { message: errorMessage };
  }

  return { message: null };
};
  
  module.exports = {
    validateName,
    validateSale,
  };