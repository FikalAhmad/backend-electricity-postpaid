import bcrypt from "bcrypt";
import levelModel from "../models/level.js";
import UserModel from "../models/user.js";

/**
 * Mengambil data user dari model user, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getUser
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getUsers = async (req, res) => {
  try {
    const response = await UserModel.findAll({
      include: { model: levelModel, as: "level" },
      order: [["id_user", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengambil data user dari model user, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getUserById
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getUserById = async (req, res) => {
  try {
    const response = await UserModel.findOne({
      where: {
        id_user: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Mengupdate data user dari model user, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function updateUser
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const updateUser = async (req, res) => {
  try {
    await UserModel.update(req.body, {
      where: {
        id_user: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Menghapus data user dari model user, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function deleteUser
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const deleteUser = async (req, res) => {
  try {
    await UserModel.destroy({
      where: {
        id_user: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Membuat data user dari model user, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function createUser
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const createUser = async (req, res) => {
  const { nama, username, password, role } = req.body;
  // genSalt() digunakan untuk menghasilkan "salt" yang merupakan nilai acak yang ditambahkan ke password sebelum proses hashing.
  const salt = await bcrypt.genSalt();
  // bcrypt.hash() digunakan untuk menghasilkan hash dari password dengan menggunakan salt yang dihasilkan.
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await UserModel.create({
      username: username,
      password: hashPassword,
      nama_admin: nama,
      id_level: role,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Login user, dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function LoginUser
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const Login = async (req, res) => {
  try {
    const user = await UserModel.findAll({
      where: {
        username: req.body.username,
      },
      include: { model: levelModel, as: "level" },
    });

    // bcrypt.compare() digunakan  untuk membandingkan password yang diinputkan oleh pengguna dengan hash yang tersimpan di database.
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Password salah" });
    const userId = user[0].id_user;
    const username = user[0].username;
    const namaUser = user[0].nama_admin;
    const mode = user[0].level.nama_level;
    res.status(200).json({
      userId,
      username,
      namaUser,
      isLogin: true,
      mode,
      msg: "Login Berhasil",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Username tidak ditemukan" });
  }
};
