import mongoose from "mongoose";

const { Schema } = mongoose;
const markerSchema = new mongoose.Schema(
  {
    courtId: {
      type: Schema.Types.ObjectId,
      ref: "Court",
      require: true,
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
    sport: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

markerSchema.index({ geometry: "2dsphere" });

const Marker = mongoose.model("Marker", markerSchema);

export default Marker;
