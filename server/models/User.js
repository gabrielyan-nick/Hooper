import mongoose from "mongoose";
import { UserSocialLinkSchema } from "./UserSocialLink";

const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    username: {
      type: String,
      require: true,
      min: 2,
      max: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    picturePath: {
      type: String,
      default: "/assets/avatar.png",
    },
    friends: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    favouriteCourts: {
      type: Schema.Types.ObjectId,
      ref: "Court",
    },
    checkins: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Checkin",
        },
      ],
      default: [],
    },
    socialLinks: {
      type: Array,
      of: UserSocialLinkSchema,
      default: [],
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

export default User;
