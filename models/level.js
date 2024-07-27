import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import UserModel from "./user.js";

const { DataTypes } = Sequelize;

const LevelModel = db.define(
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
LevelModel.hasMany(UserModel, { foreignKey: "id_level" });
UserModel.belongsTo(LevelModel, { foreignKey: "id_level", as: "level" });

export default LevelModel;
