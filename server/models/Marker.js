import mongoose from "mongoose";

const { Schema } = mongoose;
const markerSchema = new mongoose.Schema(
  {
    courtId: {
      type: Schema.Types.ObjectId,
      ref: "Court",
      require: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    sport: {
      type: String,
      require: true,
    },
    isPrivate: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Marker = mongoose.model("Marker", markerSchema);

export default Marker;
