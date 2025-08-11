import express from "express";
import { login, logout, singup } from "../controllers/admin.controller.js";

const router = express.Router();

//define routes
router.post("/signup", singup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
