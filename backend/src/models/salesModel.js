const connection = require('./connection');

const getAll = async () => {
  try {
    const [result] = await connection.execute(`
      SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
      FROM sales_products sp
      INNER JOIN products p ON sp.product_id = p.id
      INNER JOIN sales s ON sp.sale_id = s.id
      ORDER BY sp.sale_id, sp.product_id
    `);
    return result;
  } catch (error) {
    throw new Error('Failed to retrieve sales data');
  }
};

const getById = async (salesId) => {
  try {
    const [result] = await connection.execute(`
      SELECT s.date, sp.product_id AS productId, sp.quantity
      FROM sales_products sp
      INNER JOIN products p ON sp.product_id = p.id
      INNER JOIN sales s ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id
    `, [salesId]);
    return result;
  } catch (error) {
    throw new Error('Failed to retrieve sale by ID');
  }
};

module.exports = {
  getAll,
  getById,
};
