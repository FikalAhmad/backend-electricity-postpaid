import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.CONNECTION_URI, {
  dialect: process.env.DIALECT,
});

export default db;
