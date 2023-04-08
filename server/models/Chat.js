import mongoose from "mongoose";

const { Schema } = mongoose;
const chatSchema = new mongoose.Schema(
  {
    courtId: {
      type: Schema.Types.ObjectId,
      ref: "Court",
      require: true,
    },
    messages: {
      type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
