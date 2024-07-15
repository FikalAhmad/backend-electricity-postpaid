import express from "express";
import {
  createTagihan,
  deleteTagihan,
  getTagihan,
  getTagihanById,
  jumlahMeter,
  updateTagihan,
} from "../controller/TagihanController.js";

const router = express.Router();

router.get("/tagihan", getTagihan);
router.get("/tagihan/:id", getTagihanById);
router.post("/tagihan", createTagihan);
router.patch("/tagihan/:id", updateTagihan);
router.delete("/tagihan", deleteTagihan);

router.get("/jumlah_meter/:bulan/:tahun", jumlahMeter);

export default router;
