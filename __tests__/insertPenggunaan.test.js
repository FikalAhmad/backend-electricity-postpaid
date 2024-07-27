import request from "supertest";
import express from "express";
import PenggunaanModel from "../models/penggunaan.js";
import { createPenggunaan } from "../controller/PenggunaanController.js";

// Mocking PenggunaanModel
jest.mock("../models/penggunaan.js");

const app = express();
app.use(express.json());

app.post("/penggunaan", createPenggunaan);

describe("POST /penggunaan", () => {
  it("should create a new penggunaan and return a success message", async () => {
    const newPenggunaan = {
      id_pelanggan: 1,
      bulan: "Juli",
      tahun: "2024",
      meter_awal: 1000,
      meter_akhir: 1100,
    };

    PenggunaanModel.create.mockResolvedValue(newPenggunaan);

    const response = await request(app)
      .post("/penggunaan")
      .send(newPenggunaan)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toEqual({ msg: "Penggunaan Created" });
    expect(PenggunaanModel.create).toHaveBeenCalledWith(newPenggunaan);
  });

  it("should return 500 if there is a server error", async () => {
    const newPenggunaan = {
      id_pelanggan: 1,
      bulan: "Juli",
      tahun: "2024",
      meter_awal: 1000,
      meter_akhir: 1100,
    };

    PenggunaanModel.create.mockRejectedValue(new Error("Server Error"));

    const response = await request(app)
      .post("/penggunaan")
      .send(newPenggunaan)
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body).toEqual({ msg: "Server Error" });
  });
});
