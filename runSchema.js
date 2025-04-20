const fs = require("fs");
const path = require("path");
const pool = require("./db/pool");

const runSchema = async () => {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    await pool.query(schema);
    console.log("✅ Schema executed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error executing schema:", err);
    process.exit(1);
  }
};

runSchema();
