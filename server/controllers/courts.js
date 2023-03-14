import Court from "../models/Court.js";
import User from "../models/User.js";

export const addCourt = async (req, res) => {
  try {
    const newCourt = new Court(req.body);
    await newCourt.save();
    res.status(200).json(newCourt);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const getCourts = async (req, res) => {
  try {
    const courts = await Court.find();
    res.status(200).json(courts);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
