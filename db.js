require("dotenv").config();
const Knex = require("knex");
const knexConfig = require("./knexfile");

const knex = Knex(knexConfig.development);
// Test database connection
knex.raw("SELECT 1")
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit the process if the connection fails
  });

module.exports = knex;
