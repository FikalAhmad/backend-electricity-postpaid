import express from "express";
import {
  createPembayaran,
  deletePembayaran,
  getPembayaran,
  getPembayaranById,
  updatePembayaran,
} from "../controller/PembayaranController.js";
import { authenticateUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/pembayaran",
  getPembayaran,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.get(
  "/pembayaran/:id",
  getPembayaranById,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.post(
  "/pembayaran",
  createPembayaran,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.patch(
  "/pembayaran/:id",
  updatePembayaran,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.delete(
  "/pembayaran/:id",
  deletePembayaran,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);

export default router;
