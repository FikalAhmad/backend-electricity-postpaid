import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import PelangganRoute from "./routes/PelangganRoute.js";
import TarifRoute from "./routes/TarifRoute.js";
import TagihanRoute from "./routes/TagihanRoute.js";
import PembayaranRoute from "./routes/PembayaranRoute.js";
import PenggunaanRoute from "./routes/PenggunaanRoute.js";

import userModel from "./models/user.js";
import levelModel from "./models/level.js";
import pembayaranModel from "./models/pembayaran.js";
import db from "./config/Database.js";
import tarifModel from "./models/tarif.js";
import pelangganModel from "./models/pelanggan.js";
import penggunaanModel from "./models/penggunaan.js";
import tagihanModel from "./models/tagihan.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

try {
  await db.authenticate();
  console.log("Database Connected...");
  // levelModel.sync();
  // userModel.sync();
  // tarifModel.sync();
  // pelangganModel.sync();
  // penggunaanModel.sync();
  // tagihanModel.sync();
  // pembayaranModel.sync();
} catch (error) {
  console.log("error di root:", error);
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
app.listen(3000, () => console.log("Server up and running..."));
