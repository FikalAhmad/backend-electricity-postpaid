import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import PelangganModel from "./pelanggan.js";

const { DataTypes } = Sequelize;

const TarifModel = db.define(
  "tarif",
  {
    id_tarif: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    daya: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tarifperkwh: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

TarifModel.hasMany(PelangganModel, { foreignKey: "id_tarif" });
PelangganModel.belongsTo(TarifModel, { foreignKey: "id_tarif" });

export default TarifModel;
