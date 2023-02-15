import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  }
  // {
  // collection: "UserInfo",
  // }
);

export default mongoose.model("Profile", userDetailSchema);
