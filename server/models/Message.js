import mongoose from "mongoose";

const { Schema } = mongoose;
const messageSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
    picturePath: String,
    likes: { type: Map, of: Boolean },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
