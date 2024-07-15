import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import pembayaranModel from "./pembayaran.js";

const { DataTypes } = Sequelize;

const userModel = db.define(
  "user",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_admin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

userModel.hasMany(pembayaranModel, { foreignKey: "id_user" });
pembayaranModel.belongsTo(userModel, { foreignKey: "id_user" });

export default userModel;
