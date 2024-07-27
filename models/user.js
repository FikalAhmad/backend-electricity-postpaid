import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import PembayaranModel from "./pembayaran.js";

const { DataTypes } = Sequelize;

const UserModel = db.define(
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
    indexes: [
      {
        unique: true,
        fields: ["id_user"],
      },
    ],
  }
);

UserModel.hasMany(PembayaranModel, { foreignKey: "id_user" });
PembayaranModel.belongsTo(UserModel, { foreignKey: "id_user" });

export default UserModel;
