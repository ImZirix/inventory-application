require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    console.log("Starting seed");

    await pool.query("DELETE FROM items");
    await pool.query("DELETE FROM categories");

    const categories = [
      { name: "Consoles", description: "Gaming consoles and systems" },
      { name: "Accessories", description: "Controllers, headsets, and more" },
      { name: "Games", description: "Video game titles across platforms" },
      { name: "PC Hardware", description: "Gaming keyboards, mice, GPUs" },
    ];
    const categoryIds = [];
    for (const cat of categories) {
      const res = await pool.query(
        "INSERT INTO categories(name, description) VALUES($1, $2) RETURNING id",
        [cat.name, cat.description]
      );
      categoryIds.push(res.rows[0].id);
    }
    const items = [
      {
        name: "PlayStaion 5",
        description: "Latest generation sony gaming console.",
        price: 499.99,
        stock: 20,
        category_id: categoryIds[0],
      },
      {
        name: "Xbox Wireless Controller",
        description: "Ergonomic controller for Xbox and PC.",
        price: 59.99,
        stock: 40,
        category_id: categoryIds[1],
      },
      {
        name: "Elden Ring",
        description: "Award-winning action RPG from FromSoftware.",
        price: 69.99,
        stock: 25,
        category_id: categoryIds[2],
      },
      {
        name: "Razer BlackWidow V3",
        description: "Mechanical gaming keyboard with RGB lighting.",
        price: 129.99,
        stock: 10,
        category_id: categoryIds[3],
      },
    ];
    for (const item of items) {
      await pool.query(
        "INSERT INTO items(name, description, price, stock, category_id) VALUES($1, $2, $3, $4, $5)",
        [item.name, item.description, item.price, item.stock, item.category_id]
      );
    }
    console.log("✅ inventory seeded successfully!");
  } catch (err) {
    console.error("Error during seeding: ", err);
  } finally {
    pool.end;
  }
}
seed();
