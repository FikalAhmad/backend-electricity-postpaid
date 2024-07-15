import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import pembayaranModel from "./pembayaran.js";
import tagihanModel from "./tagihan.js";
import penggunaanModel from "./penggunaan.js";

const { DataTypes } = Sequelize;

const pelangganModel = db.define(
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
pelangganModel.hasMany(pembayaranModel, { foreignKey: "id_pelanggan" });
pembayaranModel.belongsTo(pelangganModel, { foreignKey: "id_pelanggan" });

pelangganModel.hasMany(tagihanModel, { foreignKey: "id_pelanggan" });
tagihanModel.belongsTo(pelangganModel, { foreignKey: "id_pelanggan" });

pelangganModel.hasMany(penggunaanModel, { foreignKey: "id_pelanggan" });
penggunaanModel.belongsTo(pelangganModel, { foreignKey: "id_pelanggan" });
export default pelangganModel;
