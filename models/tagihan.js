import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import PembayaranModel from "./pembayaran.js";

const { DataTypes } = Sequelize;

const TagihanModel = db.define(
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

TagihanModel.hasMany(PembayaranModel, { foreignKey: "id_tagihan" });
PembayaranModel.belongsTo(TagihanModel, { foreignKey: "id_tagihan" });

export default TagihanModel;
