require("dotenv").config();


console.log(process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME)

module.exports = {
    development: {
      client:'mysql',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port:3306
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
      }
    }
  };
  