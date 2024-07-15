import express from "express";
import {
  createPenggunaan,
  deletePenggunaan,
  getPenggunaan,
  getPenggunaanById,
  updatePenggunaan,
} from "../controller/PenggunaanController.js";

const router = express.Router();

router.get("/penggunaan", getPenggunaan);
router.get("/penggunaan/:id", getPenggunaanById);
router.post("/penggunaan", createPenggunaan);
router.patch("/penggunaan/:id", updatePenggunaan);
router.delete("/penggunaan", deletePenggunaan);

export default router;
