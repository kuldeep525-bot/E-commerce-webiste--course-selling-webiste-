import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //we find our user_id in mongodb
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, //same as upper
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);
