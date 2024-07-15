import { Sequelize } from "sequelize";

const db = new Sequelize(
  "postgresql://postgres.qduiqnbjgwsgpohwbsik:pLMQ3XBETlYtxz0L@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
  {
    dialect: "postgres",
  }
);

export default db;
