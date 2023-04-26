import User from "../models/User.js";
import Message from "../models/Message.js";
import fetch from "node-fetch";
import UserSocialLink from "../models/UserSocialLink.js";

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
      const parseCity = JSON.parse(data.city);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${parseCity.value}.json?proximity=ip&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
      );
      let lat, lng;
      const geoData = await response.json();
      if (geoData.query[0] === "kyiv") {
        lat = geoData.features[1].center[1];
        lng = geoData.features[1].center[0];
      } else {
        lat = geoData.features[0].center[1];
        lng = geoData.features[0].center[0];
      }
      obj = {
        city: {
          label: parseCity.label,
          value: parseCity.value,
          coordinates: [lat, lng],
        },
      };
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

    res.status(200).json({
      _id: updatedUser._id,
      picturePath: updatedUser.picturePath,
      username: updatedUser.username,
      city: updatedUser.city,
      onCourt: updatedUser.onCourt,
      token: token,
      favouriteCourts: updatedUser.favouriteCourts,
      socialLinks: updatedUser.socialLinks,
    });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const addSocialLink = async (req, res) => {
  try {
    const { userId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const newLink = new UserSocialLink({
      userId,
      ...req.body,
    });
    await newLink.save();

    const user = await User.findById(userId);
    if (!user) res.status(404).json("User not found");

    user.socialLinks.push(newLink);
    await user.save();

    res.status(200).json({
      _id: user._id,
      picturePath: user.picturePath,
      username: user.username,
      city: user.city,
      token: token,
      favouriteCourts: user.favouriteCourts,
      onCourt: user.onCourt,
      socialLinks: user.socialLinks,
    });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const delSocialLink = async (req, res) => {
  try {
    const { linkId, userId } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findById(userId);
    if (!user) res.status(404).json("User not found");

    await UserSocialLink.findByIdAndDelete(linkId);

    const socialLinks = user.socialLinks.filter((link) => link._id != linkId);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { socialLinks },
      { new: true }
    );

    res.status(200).json({
      _id: updatedUser._id,
      picturePath: updatedUser.picturePath,
      username: updatedUser.username,
      city: updatedUser.city,
      token: token,
      onCourt: updatedUser.onCourt,
      favouriteCourts: updatedUser.favouriteCourts,
      socialLinks: updatedUser.socialLinks,
    });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
