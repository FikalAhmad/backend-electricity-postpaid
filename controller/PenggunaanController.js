import pelangganModel from "../models/pelanggan.js";
import penggunaanModel from "../models/penggunaan.js";
import tagihanModel from "../models/tagihan.js";

export const getPenggunaan = async (req, res) => {
  try {
    const response = await penggunaanModel.findAll({
      include: { model: pelangganModel, as: "pelanggan" },
      order: [["id_penggunaan", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPenggunaanById = async (req, res) => {
  try {
    const response = await penggunaanModel.findOne({
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getPenggunaanByPelangganId = async (req, res) => {
  try {
    const response = await penggunaanModel.findAll({
      where: {
        id_pelanggan: req.params.id,
      },
      include: { model: tagihanModel, as: "tagihan" },
      order: [["id_penggunaan", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPenggunaan = async (req, res) => {
  try {
    await penggunaanModel.create(req.body);
    res.status(201).json({ msg: "Penggunaan Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePenggunaan = async (req, res) => {
  try {
    await penggunaanModel.update(req.body, {
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Penggunaan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePenggunaan = async (req, res) => {
  try {
    await penggunaanModel.destroy({
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Penggunaan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
