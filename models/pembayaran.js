import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const pembayaranModel = db.define(
  "pembayaran",
  {
    id_pembayaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tagihan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_pelanggan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggal_pembayaran: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    bulan_bayar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biaya_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_bayar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default pembayaranModel;
