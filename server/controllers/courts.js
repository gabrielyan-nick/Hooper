import Court from "../models/Court.js";
import Marker from "../models/Marker.js";
import User from "../models/User.js";

export const addCourt = async (req, res) => {
  try {
    const newCourt = new Court(req.body);
    await newCourt.save();

    const newMarker = new Marker({
      courtId: newCourt._id,
      ...req.body,
    });
    await newMarker.save();

    res.status(200).json(newCourt);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const getCourt = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }
    res.status(200).json(court);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const addRemoveFav = async (req, res) => {
  try {
    const { courtId } = req.params;
    const { _id } = req.body;
    const user = await User.findById(_id);
    console.log(req.body);
    if (!user) res.status(404).json({ message: "User not found" });

    const court = await Court.findById(courtId);
    if (!court) return res.status(404).json({ message: "Court not found" });

    const isFavourite = user.favouriteCourts.some(
      (court) => court._id == courtId
    );
    if (isFavourite) {
      user.favouriteCourts = user.favouriteCourts.filter(
        (court) => court._id != courtId
      );
    } else {
      user.favouriteCourts.push({ _id: court._id, name: court.name });
    }

    await user.save();
    res.status(200).json(user.favouriteCourts);
  } catch (e) {
    res.status(500).json("Unknown error");
  }
};
