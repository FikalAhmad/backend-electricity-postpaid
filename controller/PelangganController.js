import pelangganModel from "../models/pelanggan.js";
import tarifModel from "../models/tarif.js";

export const getPelanggan = async (req, res) => {
  try {
    const response = await pelangganModel.findAll({
      include: { model: tarifModel, as: "tarif" },
      order: [["id_pelanggan", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPelangganById = async (req, res) => {
  try {
    const response = await pelangganModel.findOne({
      where: {
        id_pelanggan: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPelanggan = async (req, res) => {
  try {
    await pelangganModel.create(req.body);
    res.status(201).json({ msg: "Pelanggan Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePelanggan = async (req, res) => {
  try {
    await pelangganModel.update(req.body, {
      where: {
        id_pelanggan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pelanggan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePelanggan = async (req, res) => {
  try {
    await pelangganModel.destroy({
      where: {
        id_pelanggan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pelanggan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const LoginPelanggan = async (req, res) => {
  try {
    const pelanggan = await pelangganModel.findAll({
      where: {
        username: req.body.username,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    res.status(200).json({ msg: "Pelanggan Login" });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "Pelanggan tidak ditemukan" });
  }
};

export const LogoutPelanggan = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await pelangganModel.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
