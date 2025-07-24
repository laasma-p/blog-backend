const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been successfully established.");
    await sequelize.sync({ alter: true });
    console.log("All models were successfully synchronized with alterations.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;
