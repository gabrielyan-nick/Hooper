import mongoose from "mongoose";

const { Schema } = mongoose;
const courtSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      require: true,
    },
    cover: {
      type: String,
      require: true,
    },
    lighting: {
      type: Boolean,
      require: true,
      default: function () {
        if (this.cover === "indoor") return true;
        else return false;
      },
    },
    hoopsCount: {
      type: Number,
      require: true,
      default: 2,
    },
    isPrivate: { type: Boolean, require: true, default: false },
    name: {
      type: String,
      required: true,
      default: function () {
        if (this.sport === "basketball") return "Баскетбольний майданчик";
        else return "Футбольне поле";
      },
    },
    picturePath: {
      type: String,
      require: true,
      default: function () {
        if (this.isPrivate) {
          if (this.sport === "basketball")
            return "/assets/basketball-court-private.jpg";
          else if (this.sport === "football")
            return "/assets/football-court-private.jpg";
        } else {
          if (this.sport === "basketball")
            return "/assets/basketball-court-notprivate.jpg";
          else if (this.sport === "football")
            return "/assets/football-court-notprivate.jpg";
        }
      },
    },
    photosPath: {
      type: [String],
      default: [],
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
    description: {
      type: String,
      require: true,
      default: "",
    },
    messages: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message",
        },
      ],
      default: [],
    },
    players: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId, ref: "User" },
          name: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    comingSoonPlayers: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId, ref: "User" },
          name: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    checkinPlayers: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId, ref: "User" },
          name: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    organizerContact: String,
  },

  { timestamps: true }
);

courtSchema.index({ location: "2dsphere" });

const Court = mongoose.model("Court", courtSchema);

export default Court;
