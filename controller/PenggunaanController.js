import pelangganModel from "../models/pelanggan.js";
import penggunaanModel from "../models/penggunaan.js";

export const getPenggunaan = async (req, res) => {
  try {
    const response = await penggunaanModel.findAll({
      include: { model: pelangganModel, as: "pelanggan" },
      order: [["id_penggunaan", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPenggunaanById = async (req, res) => {
  try {
    const response = await penggunaanModel.findOne({
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// export const createPenggunaan = async (req, res) => {
//   try {
//     await penggunaanModel.create(req.body);
//     res.status(201).json({ msg: "Penggunaan Created" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
export const createPenggunaan = async (req, res) => {
  const { id_pelanggan, bulan, tahun, meter_awal, meter_akhir } = req.body;
  try {
    const result = await sequelize.query(
      `INSERT INTO penggunaan (id_pelanggan, bulan, tahun, meter_awal, meter_akhir) 
      VALUES (:id_pelanggan, :bulan, :tahun, :meter_awal, :meter_akhir) RETURNING *`,
      {
        replacements: { id_pelanggan, bulan, tahun, meter_awal, meter_akhir },
        type: Sequelize.QueryTypes.INSERT
      }
    );
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePenggunaan = async (req, res) => {
  try {
    await penggunaanModel.update(req.body, {
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Penggunaan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePenggunaan = async (req, res) => {
  try {
    await penggunaanModel.destroy({
      where: {
        id_penggunaan: req.params.id,
      },
    });
    res.status(200).json({ msg: "Penggunaan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
