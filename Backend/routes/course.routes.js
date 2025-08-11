import express from "express";
import {
  buyCourses,
  courseDetails,
  createCourse,
  DeleteCourse,
  getCourse,
  updateCourse,
} from "../controllers/course.controller.js";
import usemiddleware from "../middleware/user.middleware.js";
import adminmiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

//define routes
router.post("/create", adminmiddleware, createCourse);
router.put("/update/:courseId", adminmiddleware, updateCourse);
router.delete("/delete/:courseId", adminmiddleware, DeleteCourse);
router.get("/courses", getCourse);
router.get("/:courseId", courseDetails);
router.post("/buy/:courseId", usemiddleware, buyCourses);

export default router;
