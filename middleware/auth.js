import LevelModel from "../models/level.js";
import UserModel from "../models/user.js";

/**
 * Memeriksa apakah pengguna memiliki peran yang sesuai.
 *
 * @async
 * @param {number|string} userId - id_user yang akan diperiksa.
 * @param {string[]} requiredRole - Daftar peran yang diizinkan.
 * @returns {Promise<boolean>} - `true` jika pengguna memiliki salah satu peran yang diperlukan, `false` jika tidak.
 * @throws {Error} - Jika terjadi kesalahan saat memeriksa peran user.
 */
const checkUserRole = async (userId, requiredRole) => {
  // userId: ID user.
  // requiredRole: role apa yang hanya bisa diakses routenya.

  try {
    const user = await UserModel.findByPk(userId, {
      include: [{ model: LevelModel, as: "level", attributes: ["nama_level"] }],
    });
    if (!user) {
      console.error(`User with id ${userId} not found.`);
      return false;
    }
    return requiredRole.includes(user.level.nama_level);
  } catch (error) {
    console.error(`Error checking user role: ${error.message}`);
    throw error;
  }
};

/**
 * Middleware untuk memverifikasi pengguna dengan mengekstrak userId dari header.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 * @param {Function} next - Fungsi untuk melanjutkan ke middleware berikutnya.
 * @returns {void}
 */
export const authenticateUser = (req, res, next) => {
  //req: Request object.
  //res: Response object.
  //next: ke proses selanjutnya setelah authenticate selesai dijalankan.

  const userId = req.headers["x-user-id"];
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.id_user = userId;
  next();
};

/**
 * Middleware untuk memeriksa apakah pengguna memiliki salah satu peran yang diizinkan.
 *
 * @param {string[]} requiredRole - Daftar peran yang diizinkan.
 * @returns {Function} - Middleware function.
 */
export const authorizeRole = (requiredRole) => {
  //requiredRole: pengecekan role untuk akses tertentu.
  return async (req, res, next) => {
    try {
      const userId = req.id_user;
      const hasRole = await checkUserRole(userId, requiredRole);
      if (hasRole) {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      console.error(`Error authorizing role: ${error.message}`);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
