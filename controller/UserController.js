import bcrypt from "bcrypt";
import levelModel from "../models/level.js";
import userModel from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const response = await userModel.findAll({
      include: { model: levelModel, as: "level" },
      order: [["id_user", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await userModel.findOne({
      where: {
        id_user: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    await userModel.update(req.body, {
      where: {
        id_user: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userModel.destroy({
      where: {
        id_user: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const Register = async (req, res) => {
  const { nama, username, password, role } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await userModel.create({
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

export const Login = async (req, res) => {
  try {
    const user = await userModel.findAll({
      where: {
        username: req.body.username,
      },
      include: { model: levelModel, as: "level" },
    });
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
