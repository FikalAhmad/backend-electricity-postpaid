import express from "express";
import {
  createPenggunaan,
  deletePenggunaan,
  getPenggunaan,
  getPenggunaanById,
  getPenggunaanByPelangganId,
  updatePenggunaan,
} from "../controller/PenggunaanController.js";

const router = express.Router();

router.get("/penggunaan", getPenggunaan);
router.get("/penggunaan/:id", getPenggunaanById);
router.post("/penggunaan", createPenggunaan);
router.patch("/penggunaan/:id", updatePenggunaan);
router.delete("/penggunaan/:id", deletePenggunaan);

router.get("/detailpenggunaan/:id", getPenggunaanByPelangganId);

export default router;
