import { getPelanggan } from "../controller/PelangganController.js";
import PelangganModel from "../models/pelanggan.js";
import TarifModel from "../models/tarif.js";
import PenggunaanModel from "../models/penggunaan.js";

jest.mock("../models/pelanggan.js");
jest.mock("../models/tarif.js");
jest.mock("../models/penggunaan.js");

describe("getPelanggan", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return a list of pelanggan with status 200", async () => {
    const mockData = [
      {
        id_pelanggan: 1,
        tarif: { id: 1, name: "Tarif 1" },
        penggunaans: [{ id: 1, usage: 100 }],
      },
    ];

    PelangganModel.findAll.mockResolvedValue(mockData);

    await getPelanggan(req, res);

    expect(PelangganModel.findAll).toHaveBeenCalledWith({
      include: [
        { model: TarifModel, as: "tarif" },
        { model: PenggunaanModel, as: "penggunaans" },
      ],
      order: [["id_pelanggan", "ASC"]],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("should handle errors", async () => {
    const errorMessage = "Something went wrong";
    PelangganModel.findAll.mockRejectedValue(new Error(errorMessage));

    console.log = jest.fn(); // Mock console.log

    await getPelanggan(req, res);

    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });
});
