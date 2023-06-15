const connection = require('./connection');

async function getAll() {
    const [products] = await connection.execute(
        'SELECT * FROM products',
    );
    return products;
}

async function getProductById(productId) {
    const [[result]] = await connection.execute(
        'SELECT * FROM products WHERE id = ?',
        [productId],
    );
    return result;
}

async function insertProduct(product) {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO products (name) VALUE (?)',
      [product],
    );
  
    return insertId;
  }  

async function updateProduct(name, productId) {
    await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, productId],
);
}

async function deleteProduct(productId) {
    await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );
}

async function findByName(name) {
    const [result] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [`%${name}%`],
  );
  return result;
}
  
  module.exports = {
    getAll,
    getProductById,
    insertProduct,
    updateProduct,
    deleteProduct,
    findByName,
  };