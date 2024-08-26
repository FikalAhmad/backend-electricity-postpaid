import { Sequelize } from "sequelize";
import * as pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.CONNECTION_URI, {
  dialect: process.env.DIALECT,
  dialectModule: pg,
});

export default db;
