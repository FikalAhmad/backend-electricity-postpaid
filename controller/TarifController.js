import tarifModel from "../models/tarif.js";

export const getTarif = async (req, res) => {
  try {
    const response = await tarifModel.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTarifById = async (req, res) => {
  try {
    const response = await tarifModel.findOne({
      where: {
        id_tarif: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createTarif = async (req, res) => {
  try {
    await tarifModel.create(req.body);
    res.status(201).json({ msg: "Tarif Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTarif = async (req, res) => {
  try {
    await tarifModel.update(req.body, {
      where: {
        id_tarif: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tarif Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTarif = async (req, res) => {
  try {
    await tarifModel.destroy({
      where: {
        id_tarif: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tarif Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
