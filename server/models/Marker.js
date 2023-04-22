import mongoose from "mongoose";

const { Schema } = mongoose;
const markerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "Feature",
    },
    properties: {
      courtId: {
        type: Schema.Types.ObjectId,
        ref: "Court",
        require: true,
      },
      sport: {
        type: String,
        require: true,
      },
    },
    geometry: {
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
  },
  { timestamps: true }
);

markerSchema.index({ geometry: "2dsphere" });

const Marker = mongoose.model("Marker", markerSchema);

export default Marker;
