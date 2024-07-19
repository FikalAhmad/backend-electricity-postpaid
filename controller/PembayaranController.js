import pelangganModel from "../models/pelanggan.js";
import pembayaranModel from "../models/pembayaran.js";
import tagihanModel from "../models/tagihan.js";

export const getPembayaran = async (req, res) => {
  try {
    const response = await pembayaranModel.findAll({
      include: [
        { model: pelangganModel, as: "pelanggan" },
        { model: tagihanModel, as: "tagihan" },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPembayaranById = async (req, res) => {
  try {
    const response = await pembayaranModel.findAll({
      where: {
        id_pelanggan: req.params.id,
      },
      include: [
        { model: tagihanModel, as: "tagihan" },
        { model: pelangganModel, as: "pelanggan" },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPembayaran = async (req, res) => {
  try {
    await pembayaranModel.create(req.body);
    res.status(201).json({ msg: "Pembayaran Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePembayaran = async (req, res) => {
  try {
    await pembayaranModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pembayaran Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePembayaran = async (req, res) => {
  try {
    await pembayaranModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pembayaran Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
