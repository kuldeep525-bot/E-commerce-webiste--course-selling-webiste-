import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as z from "zod";
import { JWT_ADMIN_PASSWORD } from "../config.js";
import { Admin } from "../models/admin.model.js";
export const singup = async (req, res) => {
  //we receive data in postman

  const { firstName, lastName, email, password } = req.body;
  // console.log(firstName, lastName, email, password);

  const adminSchema = z.object({
    firstName: z
      .string()
      .min(4, { message: "firstName must be 4 character long" }),
    lastName: z
      .string()
      .min(4, { message: "lastName must be 4 character long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "password must be 8 character long" }),
  });

  //for data in body validate it

  const validateData = adminSchema.safeParse(req.body);

  if (!validateData.success) {
    return res
      .status(400)
      .json({ errors: validateData.error.issues.map((err) => err.message) });
  }

  //for secure password in database

  const hasdedPassword = await bcrypt.hash(password, 10); //then give two parameter (password,salt)

  try {
    const existingAdmin = await Admin.findOne({ email: email });

    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hasdedPassword,
    });
    //save in database
    await newAdmin.save();
    res.status(201).json({ message: "Signup succeeded", newAdmin });
  } catch (error) {
    res.status(500).json({ errors: "Error in signup" });
    console.log("Error in signup", error);
  }
};

export const login = async (req, res) => {
  const NODE_ENV = "development";
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isCorrectPassword = await bcrypt.compare(password, admin.password);

    if (!isCorrectPassword) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    //write jwt code
    //generate a taken to authenticating

    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD,
      //define expirary
      { expiresIn: "1d" }
    );

    const cookiesOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1 day
      httpOnly: true, //directly not access by javascript
      secure: NODE_ENV === "production",
      sameSite: "Strict", //prevnet CSRF attack
    };

    //store token in cookes

    res.cookie("jwt", token, cookiesOption);

    // If both checks pass, return a success message and the admin object
    return res.status(200).json({ message: "Login successful", admin, token });
  } catch (error) {
    res.status(500).json({ error: "Error in login" });
    console.log("Error in login", error);
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({ errors: "Kindly login first " });
    }
    //clear the cookies
    res.clearCookie("jwt");
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in logout" });
    console.log("Error in logout", error);
  }
};
