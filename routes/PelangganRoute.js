import express from "express";
import {
  createPelanggan,
  deletePelanggan,
  getPelanggan,
  getPelangganById,
  LoginPelanggan,
  updatePelanggan,
} from "../controller/PelangganController.js";

const router = express.Router();

router.get("/pelanggan", getPelanggan);
router.get("/pelanggan/:id", getPelangganById);
router.post("/pelanggan", createPelanggan);
router.patch("/pelanggan/:id", updatePelanggan);
router.delete("/pelanggan/:id", deletePelanggan);
router.post("/login", LoginPelanggan);
// router.delete("/logout", Logout);

export default router;
