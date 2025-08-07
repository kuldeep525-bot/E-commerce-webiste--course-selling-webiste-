import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import * as z from "zod";

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
      return res.status(400).json({ error: "User already exists" });
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

    // If both checks pass, return a success message and the user object
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Error in login" });
    console.log("Error in login", error);
  }
};
