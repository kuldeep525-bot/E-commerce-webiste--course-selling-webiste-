import express from "express";
import {
  login,
  logout,
  purchase,
  singup,
} from "../controllers/user.controller.js";
import usemiddleware from "../middleware/user.middleware.js";

const router = express.Router();

//define routes
router.post("/signup", singup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/purchase", usemiddleware, purchase);

export default router;
