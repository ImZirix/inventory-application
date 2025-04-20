const pool = require("./pool");

const getAllItems = async () => {
  const res = await pool.query("SELECT * FROM items");
  return res.rows;
};

const getItem = async (name) => {
  const res = await pool.query(`SELECT * FROM items WHERE name = $1`, [name]);
  return res.rows[0];
};

const getItemById = async (id) => {
  const res = await pool.query(
    `
    SELECT * FROM items WHERE id = $1
    `,
    [id]
  );
  return res.rows[0];
};

const getAllCategories = async () => {
  const res = await pool.query("SELECT * FROM categories");
  return res.rows;
};

const getItemsByCatName = async (catName) => {
  const res = await pool.query(
    `
    SELECT items.*
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE categories.name = $1
    `,
    [catName]
  );
  return res.rows;
};

const addNewItem = async (name, description, stock, price, category_id) => {
  res = await pool.query(
    `
    INSERT INTO items (name , description, stock, price, category_id)
    VALUES($1, $2, $3, $4, $5)
    `,
    [name, description, stock, price, category_id]
  );
  return res.rows;
};

const updateItem = async (
  id,
  { name, description, price, stock, category_id }
) => {
  res = await pool.query(
    `
    UPDATE items SET name = $1, description = $2, price = $3, stock = $4, category_id = $5 WHERE id = $6
    `,
    [name, description, price, stock, category_id, id]
  );
  return res;
};

const deleteItem = async (id) => {
  res = await pool.query(
    `
    DELETE FROM items WHERE id = $1
    `,
    [id]
  );
  return res;
};
module.exports = {
  getAllItems,
  getAllCategories,
  getItemsByCatName,
  getItem,
  addNewItem,
  getItemById,
  updateItem,
  deleteItem,
};
