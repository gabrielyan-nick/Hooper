import mongoose from "mongoose";

const { Schema } = mongoose;
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      require: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
