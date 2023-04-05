import User from "../models/User.js";
import Message from "../models/Message.js";
import fetch from "node-fetch";

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
