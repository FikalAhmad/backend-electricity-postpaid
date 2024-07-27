import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import PembayaranModel from "./pembayaran.js";
import TagihanModel from "./tagihan.js";
import PenggunaanModel from "./penggunaan.js";

const { DataTypes } = Sequelize;

const PelangganModel = db.define(
  "pelanggan",
  {
    id_pelanggan: {
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
    nomor_kwh: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_pelanggan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_tarif: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
PelangganModel.hasMany(PembayaranModel, { foreignKey: "id_pelanggan" });
PembayaranModel.belongsTo(PelangganModel, { foreignKey: "id_pelanggan" });

PelangganModel.hasMany(TagihanModel, { foreignKey: "id_pelanggan" });
TagihanModel.belongsTo(PelangganModel, { foreignKey: "id_pelanggan" });

PelangganModel.hasMany(PenggunaanModel, { foreignKey: "id_pelanggan" });
PenggunaanModel.belongsTo(PelangganModel, { foreignKey: "id_pelanggan" });

export default PelangganModel;
