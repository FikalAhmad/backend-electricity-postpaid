import pelangganModel from "../models/pelanggan.js";
import pembayaranModel from "../models/pembayaran.js";
import penggunaanModel from "../models/penggunaan.js";
import tagihanModel from "../models/tagihan.js";

export const getDataTotal = async (req, res) => {
  try {
    const totalPelanggan = await pelangganModel.count();
    const totalPenggunaan = await penggunaanModel.count();
    const totalTagihan = await tagihanModel.count();
    const totalPembayaran = await pembayaranModel.count();

    const response = {
      totalPelanggan,
      totalPenggunaan,
      totalTagihan,
      totalPembayaran,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
