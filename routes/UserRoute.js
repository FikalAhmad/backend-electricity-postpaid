import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  Register,
  Login,
  deleteUser,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);
router.post("/user", Register);
router.post("/admin/login", Login);
router.delete("/user/:id", deleteUser);

export default router;
