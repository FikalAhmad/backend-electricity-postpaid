import express from "express";
import {
  createTarif,
  deleteTarif,
  getTarif,
  getTarifById,
  updateTarif,
} from "../controller/TarifController.js";

const router = express.Router();

router.get("/tarif", getTarif);
router.get("/tarif/:id", getTarifById);
router.post("/tarif", createTarif);
router.patch("/tarif/:id", updateTarif);
router.delete("/tarif/:id", deleteTarif);

export default router;
