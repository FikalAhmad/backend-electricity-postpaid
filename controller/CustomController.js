import PelangganModel from "../models/pelanggan.js";
import PembayaranModel from "../models/pembayaran.js";
import PenggunaanModel from "../models/penggunaan.js";
import TagihanModel from "../models/tagihan.js";

/**
 * Mengambil data total dari model pelanggan, penggunaan, tagihan, pembayaran dan mengirimkan respons dalam bentuk JSON.
 *
 * @async
 * @function getDataTotal
 * @param {Object} req - Objek permintaan (request) dari Express.js.
 * @param {Object} res - Objek respons (response) dari Express.js.
 * @returns {Promise<void>} Tidak ada nilai yang dikembalikan, hanya mengirimkan respons dalam bentuk JSON.
 * @throws {Error} Akan melempar kesalahan jika terjadi masalah dalam pengambilan data atau pengiriman respons.
 */
export const getDataTotal = async (req, res) => {
  try {
    const totalPelanggan = await PelangganModel.count();
    const totalPenggunaan = await PenggunaanModel.count();
    const totalTagihan = await TagihanModel.count();
    const totalPembayaran = await PembayaranModel.count();

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
