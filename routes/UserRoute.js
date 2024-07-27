import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  Login,
  deleteUser,
  createUser,
} from "../controller/UserController.js";
import { authenticateUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/user",
  getUsers,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.get(
  "/user/:id",
  getUserById,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.patch(
  "/user/:id",
  updateUser,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.post(
  "/user",
  createUser,
  authenticateUser,
  authorizeRole(["Admin", "Petugas", "Pelanggan"])
);
router.post("/admin/login", Login);
router.delete("/user/:id", deleteUser);

export default router;
