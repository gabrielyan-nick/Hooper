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
