import User from "../models/User.js";
import Message from "../models/Message.js";

export const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...data,
      },
      { new: true }
    );
    // await Message.updateMany({ user: id }, { avatar: picturePath });
    res.status(200).json({
      _id: updatedUser._id,
      picturePath: updatedUser.picturePath,
      username: updatedUser.username,
      city: updatedUser.city,
      location: updatedUser.location,
      token: token,
      favouriteCourts: updatedUser.favouriteCourts,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
