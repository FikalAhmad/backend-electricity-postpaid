import { Sequelize } from "sequelize";
import pg from "pg";

const db = new Sequelize(process.env.CONNECTION_URI, {
  dialect: process.env.DIALECT,
  dialectModule: pg,
});

export default db;
