import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import pembayaranModel from "./pembayaran.js";

const { DataTypes } = Sequelize;

const tagihanModel = db.define(
  "tagihan",
  {
    id_tagihan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_penggunaan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_pelanggan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bulan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah_meter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

tagihanModel.hasMany(pembayaranModel, { foreignKey: "id_tagihan" });
pembayaranModel.belongsTo(tagihanModel, { foreignKey: "id_tagihan" });

export default tagihanModel;
