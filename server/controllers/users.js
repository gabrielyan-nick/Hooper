import User from "../models/User.js";
import Message from "../models/Message.js";

export const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) res.status(404).json("User not found");
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    let obj;

    if (data.city) {
      obj = { city: JSON.parse(data.city) };
    } else {
      obj = data;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...obj,
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
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
