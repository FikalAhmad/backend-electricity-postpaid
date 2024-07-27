import express from "express";
import {
  createPelanggan,
  deletePelanggan,
  getPelanggan,
  getPelangganById,
  LoginPelanggan,
  updatePelanggan,
} from "../controller/PelangganController.js";
import { authenticateUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/pelanggan",
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"]),
  getPelanggan
);
router.get(
  "/pelanggan/:id",
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"]),
  getPelangganById
);
router.post(
  "/pelanggan",
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"]),
  createPelanggan
);
router.patch(
  "/pelanggan/:id",
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"]),
  updatePelanggan
);
router.delete(
  "/pelanggan/:id",
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"]),
  deletePelanggan
);
router.post("/login", LoginPelanggan);

export default router;
