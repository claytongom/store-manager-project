const connection = require('./connection');

const getAll = () => new Promise((resolve, reject) => {
    connection.execute('SELECT * FROM products')
        .then(([result]) => {
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
});

const getById = async (productId) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [result] = await connection.execute(query, [productId]);
    if (result.length === 0) return null;
    return result[0];
};

const createNewProduct = (data) => connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [data.name])
    .then(([result]) => ({
        id: result.insertId,
        name: data.name,
    }));

module.exports = {
    getAll,
    getById,
    createNewProduct,
};