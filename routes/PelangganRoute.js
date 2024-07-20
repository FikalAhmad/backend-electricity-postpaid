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
  authorizeRole(["Admin", "Petugas"]),
  getPelanggan
);
router.get(
  "/pelanggan/:id",
  authenticateUser,
  authorizeRole(["Admin", "Petugas"]),
  getPelangganById
);
router.post(
  "/pelanggan",
  authenticateUser,
  authorizeRole(["Admin", "Petugas"]),
  createPelanggan
);
router.patch(
  "/pelanggan/:id",
  authenticateUser,
  authorizeRole(["Admin", "Petugas"]),
  updatePelanggan
);
router.delete(
  "/pelanggan/:id",
  authenticateUser,
  authorizeRole(["Admin", "Petugas"]),
  deletePelanggan
);
router.post(
  "/login",
  authenticateUser,
  authorizeRole(["Admin", "Petugas"]),
  LoginPelanggan
);

export default router;
