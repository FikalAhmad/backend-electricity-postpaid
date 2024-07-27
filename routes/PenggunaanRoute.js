import express from "express";
import {
  createPenggunaan,
  deletePenggunaan,
  getPenggunaan,
  getPenggunaanById,
  getPenggunaanByPelangganId,
  updatePenggunaan,
} from "../controller/PenggunaanController.js";
import { authenticateUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/penggunaan",
  getPenggunaan,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.get(
  "/penggunaan/:id",
  getPenggunaanById,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.post(
  "/penggunaan",
  createPenggunaan,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.patch(
  "/penggunaan/:id",
  updatePenggunaan,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.delete(
  "/penggunaan/:id",
  deletePenggunaan,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);

router.get(
  "/detailpenggunaan/:id",
  getPenggunaanByPelangganId,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);

export default router;
