import TarifModel from "../models/tarif.js";

/**
 * Mengambil data tarif dari model tarif, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getTarif
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getTarif = async (req, res) => {
  try {
    const response = await TarifModel.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengambil data tarif dari model tarif, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getTarifById
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getTarifById = async (req, res) => {
  try {
    const response = await TarifModel.findOne({
      where: {
        id_tarif: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Membuat data tarif dari model tarif, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function createTarif
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const createTarif = async (req, res) => {
  try {
    await TarifModel.create(req.body);
    res.status(201).json({ msg: "Tarif Created" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengupdate data tarif dari model tarif, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function updateTarif
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const updateTarif = async (req, res) => {
  try {
    await TarifModel.update(req.body, {
      where: {
        id_tarif: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tarif Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Menghapus data tarif dari model tarif, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function deleteTarif
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const deleteTarif = async (req, res) => {
  try {
    await TarifModel.destroy({
      where: {
        id_tarif: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tarif Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
