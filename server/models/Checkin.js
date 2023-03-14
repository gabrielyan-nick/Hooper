import mongoose from "mongoose";

const { Schema } = mongoose;
const checkinSchema = new mongoose.Schema(
  {
    // _id: Schema.Types.ObjectId,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    court: {
      type: Schema.Types.ObjectId,
      ref: "Court",
      require: true,
    },
  },
  { timestamps: true }
);

const Checkin = mongoose.model("Checkin", checkinSchema);

export default Checkin;
