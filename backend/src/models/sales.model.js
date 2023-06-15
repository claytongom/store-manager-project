const connection = require('./connection');

async function getAll() {
    const [result] = await connection.execute(
        `SELECT
      sp.sale_id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales_products AS sp
    INNER JOIN products AS p
    ON sp.product_id = p.id
    INNER JOIN sales AS s
    ON sp.sale_id = s.id
    ORDER BY sale_id, product_id`,
    );
    return result;
}

async function getProductById(salesId) {
    const [result] = await connection.execute(
        `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sale_id, product_id`,
        [salesId],
    );
    return result;
}

async function createSaleId() {
    const [{ insertId }] = await connection.execute(
        'INSERT INTO sales (date) VALUE (DATE(NOW()))',
    );
    return insertId;
}

async function createSale(insertId, productId, quantity) {
    await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
        [insertId, productId, quantity],
    );
    return {
        productId,
        quantity,
    };
}

const deleteSale = async (sale) => connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [sale],
);

module.exports = { getAll, getProductById, createSaleId, createSale, deleteSale };