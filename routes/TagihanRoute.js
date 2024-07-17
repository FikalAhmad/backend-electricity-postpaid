import express from "express";
import {
  createTagihan,
  deleteTagihan,
  getTagihan,
  getTagihanById,
  getTagihanByPelangganId,
  updateTagihan,
} from "../controller/TagihanController.js";

const router = express.Router();

router.get("/tagihan", getTagihan);
router.get("/tagihan/:id", getTagihanById);
router.post("/tagihan", createTagihan);
router.patch("/tagihan/:id", updateTagihan);
router.delete("/tagihan/:id", deleteTagihan);

router.get("/tagihanpelanggan/:id", getTagihanByPelangganId);

export default router;
