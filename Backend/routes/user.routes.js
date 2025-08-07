import express from "express";
import { login, singup } from "../controllers/user.controller.js";

const router = express.Router();

//define routes
router.post("/signup", singup);
router.post("/login", login);

export default router;
