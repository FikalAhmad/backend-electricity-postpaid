import express from "express";
import {
  createTarif,
  deleteTarif,
  getTarif,
  getTarifById,
  updateTarif,
} from "../controller/TarifController.js";
import { authenticateUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/tarif",
  getTarif,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.get(
  "/tarif/:id",
  getTarifById,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.post(
  "/tarif",
  createTarif,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.patch(
  "/tarif/:id",
  updateTarif,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.delete(
  "/tarif",
  deleteTarif,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);

export default router;
