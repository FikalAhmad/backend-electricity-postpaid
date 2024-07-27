import express from "express";
import {
  createTagihan,
  deleteTagihan,
  getTagihan,
  getTagihanById,
  getTagihanByPelangganId,
  updateTagihan,
} from "../controller/TagihanController.js";
import { authenticateUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/tagihan",
  getTagihan,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.get(
  "/tagihan/:id",
  getTagihanById,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.post(
  "/tagihan",
  createTagihan,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.patch(
  "/tagihan/:id",
  updateTagihan,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.delete(
  "/tagihan/:id",
  deleteTagihan,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);

router.get(
  "/tagihanpelanggan/:id",
  getTagihanByPelangganId,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);

export default router;
