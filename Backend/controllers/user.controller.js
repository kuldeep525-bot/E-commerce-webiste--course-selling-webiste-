import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as z from "zod";
import { JWT_USER_PASSWORD } from "../config.js";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";
export const singup = async (req, res) => {
  //we receive data in postman

  const { firstName, lastName, email, password } = req.body;
  // console.log(firstName, lastName, email, password);

  const userSchema = z.object({
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

  const validateData = userSchema.safeParse(req.body);

  if (!validateData.success) {
    return res
      .status(400)
      .json({ errors: validateData.error.issues.map((err) => err.message) });
  }

  //for secure password in database

  const hasdedPassword = await bcrypt.hash(password, 10); //then give two parameter (password,salt)

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hasdedPassword,
    });
    //save in database
    await newUser.save();
    res.status(201).json({ message: "Signup succeeded", newUser });
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
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    //write jwt code
    //generate a taken to authenticating

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD,
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

    // If both checks pass, return a success message and the user object
    return res.status(200).json({ message: "Login successful", user, token });
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

export const purchase = async (req, res) => {
  //firstly get user id
  const userId = req.userId;
  // console.log(userId);

  try {
    const purchased = await Purchase.find({ userId });

    //if user buy multiple courses, then we store in array

    let purchaedcoursesid = [];

    for (let i = 0; i < purchased.length; i++) {
      purchaedcoursesid.push(purchased[i].courseId);
    }

    const coursedata = await Course.find({ _id: { $in: purchaedcoursesid } });

    res
      .status(200)
      .json({ message: "find successfully", purchased, coursedata });
  } catch (error) {
    res.status(500).json({ error: "Error in purchase" });
    console.log("Error in purchase", error);
  }
};
