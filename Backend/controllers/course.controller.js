import { v2 as cloudinary } from "cloudinary";

import { Course } from "../models/course.model.js";

// Define the createCourse function
export const createCourse = async (req, res) => {
  // console.log("Request body:", req.body); // Debugging: Log the request body

  // Destructure the request body
  const { title, description, price } = req.body;

  // console.log(title, description, price);

  try {
    // Validate required fields
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const { image } = req.files;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No file uploaded.");
    }

    //user image format

    const allowedformat = ["image/png", "image/jpeg"];

    if (!allowedformat.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ error: "Invalid file format, Only PNG and JPG are allowed" });
    }

    //claudinary code

    const coud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!coud_response || coud_response.error) {
      return res
        .status(400)
        .json({ error: "error uploading file to cloudinary" });
    }

    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: coud_response.public_id,
        url: coud_response.url,
      }, // Use the Cloudinary URL
    };

    // Save course to database
    const course = await Course.create(courseData);
    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating course" });
  }
};

//define updateCourse function

export const updateCourse = async (req, res) => {
  //firstly we take id:
  //id is useful for update the data in database

  const { courseId } = req.params;
  const { title, description, price, image } = req.body;

  try {
    const course = await Course.updateOne(
      {
        _id: courseId,
      },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      }
    );

    res.status(201).json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in  course updating" });
    console.log("Error in course updating", error);
  }
};

export const DeleteCourse = async (req, res) => {
  //firstly we take id:
  //id is useful for delete the data in database

  const { courseId } = req.params; //found course id with req.params

  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
    });

    if (!course) {
      res.status(404).json({ error: "course not found" });
    }

    res.status(201).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in  course deleting" });
    console.log("Error in course updating", error);
  }
};

export const getCourse = async (req, res) => {
  try {
    //give me all course of this variable

    const courses = await Course.find({});

    if (courses) {
      res
        .status(201)
        .json({ courses }, { message: "Courses available successfully" });
      console.log("All courses get successfully");
    }
  } catch (error) {
    res.status(500).json({ errors: "error in getting courses" });
    console.log("error to get courses", error);
  }
};

export const courseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    //paritcular course data
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ errors: "error in getting courses" });
    console.log("error in course details", error);
  }
};
