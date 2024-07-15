import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import userModel from "./user.js";

const { DataTypes } = Sequelize;

const levelModel = db.define(
  "level",
  {
    id_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
levelModel.hasMany(userModel, { foreignKey: "id_level" });
userModel.belongsTo(levelModel, { foreignKey: "id_level", as: "level" });

export default levelModel;
