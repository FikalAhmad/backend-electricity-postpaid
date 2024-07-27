import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import PelangganRoute from "./routes/PelangganRoute.js";
import TarifRoute from "./routes/TarifRoute.js";
import TagihanRoute from "./routes/TagihanRoute.js";
import PembayaranRoute from "./routes/PembayaranRoute.js";
import PenggunaanRoute from "./routes/PenggunaanRoute.js";
import db from "./config/Database.js";
import dotenv from "dotenv";

import UserModel from "./models/user.js";
import LevelModel from "./models/level.js";
import PembayaranModel from "./models/pembayaran.js";
import TarifModel from "./models/tarif.js";
import PelangganModel from "./models/pelanggan.js";
import PenggunaanModel from "./models/penggunaan.js";
import TagihanModel from "./models/tagihan.js";
import { getDataTotal } from "./controller/CustomController.js";

const app = express();
dotenv.config();

try {
  await db.authenticate();
  console.log("Database Connected...");
  // LevelModel.sync();
  // UserModel.sync();
  // TarifModel.sync();
  // PelangganModel.sync();
  // PenggunaanModel.sync();
  // TagihanModel.sync();
  // PembayaranModel.sync();
} catch (error) {
  console.log(error);
}
const allowedOrigins = ["http://localhost:5173/"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(UserRoute);
app.use(PelangganRoute);
app.use(TarifRoute);
app.use(TagihanRoute);
app.use(PembayaranRoute);
app.use(PenggunaanRoute);
app.get("/totaldata", getDataTotal);
app.listen(3000, () => console.log("Server up and running..."));
