import express from "express";
import {
  courseDetails,
  createCourse,
  DeleteCourse,
  getCourse,
  updateCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

//define routes
router.post("/create", createCourse);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", DeleteCourse);
router.get("/courses", getCourse);
router.get("/:courseId", courseDetails);
export default router;
