import mongoose from "mongoose";

const { Schema } = mongoose;
const courtSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    lighting: {
      type: Boolean,
      required: true,
      default: function () {
        if (this.cover === "indoor") return true;
        else return false;
      },
    },
    hoopsCount: {
      type: Number,
      required: true,
      default: 2,
    },
    name: {
      type: String,
      max: 23,
      required: true,
      default: function () {
        if (this.sport === "basketball") return "Баскетбольний майданчик";
        else return "Футбольне поле";
      },
    },
    addInfo: {
      type: String,
      max: 200,
      default: "",
    },
    photos: {
      type: [String],
      required: true,
      default: function () {
        if (this.sport === "basketball") {
          return ["/assets/basketball-court-notprivate.jpg"];
        } else if (this.sport === "football") {
          return ["/assets/football-court-notprivate.jpg"];
        }
        return [];
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
    description: {
      type: String,
      default: "",
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    players: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId, ref: "User" },
          username: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    checkinPlayers: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId, ref: "User" },
          username: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },

  { timestamps: true }
);

courtSchema.index({ geometry: "2dsphere" });

const Court = mongoose.model("Court", courtSchema);

export default Court;
