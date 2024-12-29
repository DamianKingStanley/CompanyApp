import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    userId: { type: String },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "errander", "admin"],
      required: true,
    },
    profilePicture: { type: String },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
