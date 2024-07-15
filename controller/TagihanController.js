import tagihanModel from "../models/tagihan.js";

export const getTagihan = async (req, res) => {
  try {
    const response = await tagihanModel.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTagihanById = async (req, res) => {
  try {
    const response = await tagihanModel.findOne({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createTagihan = async (req, res) => {
  try {
    await tagihanModel.create(req.body);
    res.status(201).json({ msg: "Tagihan Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTagihan = async (req, res) => {
  try {
    await tagihanModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tagihan Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTagihan = async (req, res) => {
  try {
    await tagihanModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Tagihan Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const jumlahMeter = async (req, res) => {
  const { bulan, tahun } = req.params;
  try {
    const result = await sequelize.query(
      `SELECT jumlah_meter(:bulan, :tahun) AS jumlah_meter`,
      {
        replacements: { bulan, tahun },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
