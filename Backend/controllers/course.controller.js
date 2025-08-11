import { v2 as cloudinary } from "cloudinary";
import { Course } from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";

// Define the createCourse function
export const createCourse = async (req, res) => {
  const adminId = req.adminId;
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
      creatorId: adminId,
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
  const adminId = req.adminId;
  //firstly we take id:
  //id is useful for update the data in database

  const { courseId } = req.params;
  const { title, description, price, image } = req.body;

  try {
    const course = await Course.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
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

    res.status(201).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ errors: "Error in  course updating" });
    console.log("Error in course updating", error);
  }
};

export const DeleteCourse = async (req, res) => {
  const adminId = req.adminId;
  //firstly we take id:
  //id is useful for delete the data in database

  const { courseId } = req.params; //found course id with req.params

  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
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

export const buyCourses = async (req, res) => {
  // We require userId that is found in req
  const { userId } = req;
  const { courseId } = req.params; // It is found in req.params

  try {
    const course = await Course.findById(courseId); // It is in our database
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If user has bought a course before
    // Check if the user has already purchased this course
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ error: "User has already purchased this course" });
    }
    // If user is not buying before, we create it
    const newPurchase = new Purchase({ userId, courseId });
    await newPurchase.save();
    res
      .status(201)
      .json({ message: "Course purchased successfully", newPurchase });
  } catch (error) {
    res.status(500).json({ error: "Error in course buying" });
    console.log("error in course buying", error);
  }
};
