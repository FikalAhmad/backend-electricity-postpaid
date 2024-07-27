import PelangganModel from "../models/pelanggan.js";
import PenggunaanModel from "../models/penggunaan.js";
import TarifModel from "../models/tarif.js";
import bcrypt from "bcrypt";

/**
 * Mengambil data pelanggan dari model pelanggan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getPelanggan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getPelanggan = async (req, res) => {
  try {
    const response = await PelangganModel.findAll({
      include: [
        { model: TarifModel, as: "tarif" },
        { model: PenggunaanModel, as: "penggunaans" },
      ],
      order: [["id_pelanggan", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengambil data pelanggan dari model pelanggan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getPelangganById
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getPelangganById = async (req, res) => {
  try {
    const response = await PelangganModel.findOne({
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
 * Membuat data pelanggan dari model pelanggan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function createPelanggan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const createPelanggan = async (req, res) => {
  // Destructuring data dari request body
  const { username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif } =
    req.body;

  // genSalt() digunakan untuk menghasilkan "salt" yang merupakan nilai acak yang ditambahkan ke password sebelum proses hashing.
  const salt = await bcrypt.genSalt();
  // bcrypt.hash() digunakan untuk menghasilkan hash dari password dengan menggunakan salt yang dihasilkan.
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await PelangganModel.create({
      username,
      password: hashPassword,
      nomor_kwh,
      nama_pelanggan,
      alamat,
      id_tarif,
    });
    res.status(201).json({ msg: "Pelanggan Created" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengupdate data pelanggan dari model pelanggan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function updatePelanggan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const updatePelanggan = async (req, res) => {
  try {
    await PelangganModel.update(req.body, {
      where: {
        id_pelanggan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pelanggan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Menghapus data pelanggan dari model pelanggan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function deletePelanggan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const deletePelanggan = async (req, res) => {
  try {
    await PelangganModel.destroy({
      where: {
        id_pelanggan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pelanggan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Login Pelanggan, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function LoginPelanggan
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const LoginPelanggan = async (req, res) => {
  try {
    const pelanggan = await PelangganModel.findAll({
      where: {
        username: req.body.username,
      },
    });

    // bcrypt.compare() digunakan  untuk membandingkan password yang diinputkan oleh pengguna dengan hash yang tersimpan di database.
    const match = await bcrypt.compare(
      req.body.password,
      pelanggan[0].password
    );
    if (!match) return res.status(400).json({ msg: "Password salah" });
    const userId = pelanggan[0].id_pelanggan;
    const username = pelanggan[0].username;
    const namaUser = pelanggan[0].nama_pelanggan;
    res.status(200).json({
      userId,
      username,
      namaUser,
      mode: "Pelanggan",
      isLogin: true,
      msg: "Login Berhasil",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Username tidak ditemukan" });
  }
};
