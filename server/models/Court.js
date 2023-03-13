import mongoose from "mongoose";

const { Schema } = mongoose;
const courtSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    type: {
      type: String,
      require: true,
    },
    isPrivate: { type: Boolean, require: true, default: false },
    name: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      require: true,
      default: function () {
        if (this.isPrivate) {
          if (this.type === "basketball")
            return "/assets/basketball-court-private.jpg";
          else if (this.type === "football")
            return "/assets/football-court-private.jpg";
        } else {
          if (this.type === "basketball")
            return "/assets/basketball-court-notprivate.jpg";
          else if (this.type === "football")
            return "/assets/football-court-notprivate.jpg";
        }
      },
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
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    comingSoonPlayers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
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
  },

  { timestamps: true }
);

courtSchema.index({ location: '2dsphere' });

const Court = mongoose.model("Court", courtSchema);

export default Court;
