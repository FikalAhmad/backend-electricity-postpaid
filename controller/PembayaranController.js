import PelangganModel from "../models/pelanggan.js";
import PembayaranModel from "../models/pembayaran.js";
import TagihanModel from "../models/tagihan.js";

/**
 * Mengambil data pembayaran dari model pembayaran, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getPembayaran
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getPembayaran = async (req, res) => {
  try {
    const response = await PembayaranModel.findAll({
      include: [
        { model: PelangganModel, as: "pelanggan" },
        { model: TagihanModel, as: "tagihan" },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengambil data pembayaran berdasarkan id pembayaran dari model pembayaran, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getPembayaranById
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getPembayaranById = async (req, res) => {
  try {
    const response = await PembayaranModel.findAll({
      where: {
        id_pelanggan: req.params.id,
      },
      include: [
        { model: TagihanModel, as: "tagihan" },
        { model: PelangganModel, as: "pelanggan" },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Membuat data pembayaran dari model pembayaran, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function createPembayaran
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const createPembayaran = async (req, res) => {
  try {
    await PembayaranModel.create(req.body);
    res.status(201).json({ msg: "Pembayaran Created" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengupdate data pembayaran dari model pembayaran, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function updatePembayaran
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const updatePembayaran = async (req, res) => {
  try {
    await PembayaranModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pembayaran Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Menghapus data pembayaran dari model pembayaran, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function deletePembayaran
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const deletePembayaran = async (req, res) => {
  try {
    await PembayaranModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pembayaran Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
