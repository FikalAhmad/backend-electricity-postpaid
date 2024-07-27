import PelangganModel from "../models/pelanggan.js";
import PenggunaanModel from "../models/penggunaan.js";
import TagihanModel from "../models/tagihan.js";

/**
 * Mengambil data penggunaan dari model penggunaan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getPenggunaan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getPenggunaan = async (req, res) => {
  try {
    const response = await PenggunaanModel.findAll({
      include: { model: PelangganModel, as: "pelanggan" },
      order: [["id_penggunaan", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengambil data penggunaan berdasarkan id penggunaan dari model penggunaan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getPenggunaanById
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getPenggunaanById = async (req, res) => {
  try {
    const response = await PenggunaanModel.findOne({
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengambil data penggunaan berdasarkan id pelanggan dari model penggunaan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getPenggunaanByPelangganId
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getPenggunaanByPelangganId = async (req, res) => {
  try {
    const response = await PenggunaanModel.findAll({
      where: {
        id_pelanggan: req.params.id,
      },
      include: { model: TagihanModel, as: "tagihan" },
      order: [["id_penggunaan", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Membuat data penggunaan dari model penggunaan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function createPenggunaan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const createPenggunaan = async (req, res) => {
  try {
    await PenggunaanModel.create(req.body);
    res.status(201).json({ msg: "Penggunaan Created" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengupdate data penggunaan dari model penggunaan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function updatePenggunaan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const updatePenggunaan = async (req, res) => {
  try {
    await PenggunaanModel.update(req.body, {
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Penggunaan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Menghapus data penggunaan dari model penggunaan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function deletePenggunaan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const deletePenggunaan = async (req, res) => {
  try {
    await PenggunaanModel.destroy({
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Penggunaan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
