import mongoose from "mongoose";

const { Schema } = mongoose;
export const userSocialLinkSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserSocialLink = mongoose.model("UserSocialLink", userSocialLinkSchema);

export default UserSocialLink;
