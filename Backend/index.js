import express from "express";
import mongoose from "mongoose";
import courseRoute from "./routes/course.routes.js";
import userRoute from "./routes/user.routes.js";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";

const app = express();
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

//file upload code with expressfile upload

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const port = 4000;
const MONGO_URI = "mongodb://localhost:27017/E-commerce";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);

//cloudinary values
const cloudname = "dtfn5evgt";
const apikey = "467531842517858";
const apiscreet = "pWGl3V4mkG-0kvhfCgy4TQzXXwM";

// cloudinary Configuration
cloudinary.config({
  cloud_name: cloudname,
  api_key: apikey,
  api_secret: apiscreet,
});

// HTTP server started
app.get("/", (req, res) => {
  res.send("Hello world welcome babes love you");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
