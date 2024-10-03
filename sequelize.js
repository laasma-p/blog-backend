const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
  }
);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database has been synced.");
  })
  .catch((error) => {
    console.error("Failed to sync the database", error);
  });

module.exports = sequelize;
