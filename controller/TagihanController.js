import PelangganModel from "../models/pelanggan.js";
import PenggunaanModel from "../models/penggunaan.js";
import TagihanModel from "../models/tagihan.js";

/**
 * Mengambil data tagihan dari model tagihan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getTagihan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getTagihan = async (req, res) => {
  try {
    const response = await TagihanModel.findAll({
      include: [
        { model: PenggunaanModel, as: "penggunaan" },
        { model: PelangganModel, as: "pelanggan" },
      ],
      order: [["id_tagihan", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengambil data tagihan berdasarkan id tagihan dari model tagihan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getTagihanById
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getTagihanById = async (req, res) => {
  try {
    const response = await TagihanModel.findOne({
      where: {
        id_tagihan: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengambil data tagihan berdasarkan id pelanggan dari model tagihan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getTagihanByPelangganId
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getTagihanByPelangganId = async (req, res) => {
  try {
    const response = await TagihanModel.findAll({
      where: {
        id_pelanggan: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Membuat data tagihan dari model tagihan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function createTagihan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const createTagihan = async (req, res) => {
  try {
    await TagihanModel.create(req.body);
    res.status(201).json({ msg: "Tagihan Created" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengupdate data tagihan dari model tagihan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function updateTagihan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const updateTagihan = async (req, res) => {
  try {
    await TagihanModel.update(req.body, {
      where: {
        id_tagihan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tagihan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Menghapus data tagihan dari model tagihan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function deleteTagihan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const deleteTagihan = async (req, res) => {
  try {
    await TagihanModel.destroy({
      where: {
        id_tagihan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tagihan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
