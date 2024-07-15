import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import pelangganModel from "./pelanggan.js";

const { DataTypes } = Sequelize;

const tarifModel = db.define(
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

tarifModel.hasMany(pelangganModel, { foreignKey: "id_tarif" });
pelangganModel.belongsTo(tarifModel, { foreignKey: "id_tarif" });

export default tarifModel;
