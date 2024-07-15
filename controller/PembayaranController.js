import pembayaranModel from "../models/pembayaran.js";

export const getPembayaran = async (req, res) => {
  try {
    const response = await pembayaranModel.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPembayaranById = async (req, res) => {
  try {
    const response = await pembayaranModel.findOne({
      where: {
        userId: req.params.id,
      },
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
