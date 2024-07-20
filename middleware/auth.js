import levelModel from "../models/level.js";
import userModel from "../models/user.js";

/**
 * Memeriksa apakah pengguna memiliki peran yang sesuai.
 *
 * @param {number|string} userId - id_user yang akan diperiksa.
 * @param {string[]} requiredRole - Daftar peran yang diizinkan.
 * @returns {Promise<boolean>} - `true` jika pengguna memiliki salah satu peran yang diperlukan, `false` jika tidak.
 * @throws {Error} - Jika terjadi kesalahan saat memeriksa peran user.
 */
const checkUserRole = async (userId, requiredRole) => {
  try {
    const user = await userModel.findByPk(userId, {
      include: [{ model: levelModel, as: "level", attributes: ["nama_level"] }],
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
