import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import tagihanModel from "./tagihan.js";

const { DataTypes } = Sequelize;

const penggunaanModel = db.define(
  "penggunaan",
  {
    id_penggunaan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    meter_awal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    meter_akhir: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

penggunaanModel.hasMany(tagihanModel, { foreignKey: "id_penggunaan" });
tagihanModel.belongsTo(penggunaanModel, { foreignKey: "id_penggunaan" });

export default penggunaanModel;
