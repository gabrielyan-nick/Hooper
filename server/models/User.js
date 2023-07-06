import mongoose from "mongoose";
import { userSocialLinkSchema } from "./UserSocialLink.js";

const { Schema } = mongoose;
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 2,
      max: 20,
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
    onCourt: {
      isOnCourt: {
        type: Boolean,
        default: false,
      },
      courtId: {
        type: Schema.Types.ObjectId,
        ref: "Court",
        default: null,
      },
    },
    // friends: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "User",
    //     },
    //   ],
    //   default: [],
    // },
    favouriteCourts: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId, ref: "Court" },
          name: String,
          sport: String,
          coordinates: [Number],
        },
      ],
      default: [],
    },
    // addedCourts: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Court",
    //     },
    //   ],
    //   default: [],
    // },
    // checkins: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Checkin",
    //     },
    //   ],
    //   default: [],
    // },
    socialLinks: {
      type: Array,
      of: userSocialLinkSchema,
      default: [],
    },
    city: {
      type: Object,
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
