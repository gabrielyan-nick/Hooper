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

    res.status(200).json({
      cover: court.cover,
      hoopsCount: court.hoopsCount,
      isPrivate: court.isPrivate,
      lighting: court.lighting,
      location: court.location,
      messages: court.messages,
      name: court.name,
      picturePath: court.picturePath,
      sport: court.sport,
      _id: court._id,
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const addRemoveFav = async (req, res) => {
  try {
    const { courtId } = req.params;
    const { _id } = req.body;
    const user = await User.findById(_id);

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
      user.favouriteCourts.push({
        _id: court._id,
        name: court.name,
        sport: court.sport,
      });
    }

    await user.save();
    res.status(200).json(user.favouriteCourts);
  } catch (e) {
    res.status(500).json("Unknown error");
  }
};

export const checkInOnCourt = async (req, res) => {
  try {
    const { courtId } = req.params;
    const { _id, username } = req.body;
    const court = await Court.findById(courtId);
    if (!court) res.status(404).json({ message: "Court not found" });

    court.checkinPlayers.unshift({
      _id,
      username,
    });

    const isOnCourt = court.players.some((player) => player._id == _id);
    if (!isOnCourt) {
      court.players.unshift({
        _id,
        username,
      });
    }

    setTimeout(async () => {
      const index = court.players.findIndex((player) => player._id == _id);
      if (index !== -1) {
        court.players.splice(index, 1);
        await court.save();
      }
    }, 5 * 60 * 1000);

    await court.save();

    res.status(200).json({ message: "Successful" });
  } catch (e) {
    res.status(500).json({ message: "Unknown error" });
  }
};

export const checkOutOnCourt = async (req, res) => {
  try {
    const { courtId } = req.params;
    const { _id } = req.body;
    const court = await Court.findById(courtId);
    if (!court) res.status(404).json({ message: "Court not found" });

    const isOnCourt = court.players.some((player) => player._id == _id);
    if (isOnCourt) {
      court.players = court.players.filter((player) => player._id != _id);
    }

    await court.save();

    res.status(200).json({ message: "Successful" });
  } catch (e) {
    res.status(500).json({ message: "Unknown error" });
  }
};

export const getCourtPlayers = async (req, res) => {
  try {
    const { courtId } = req.params;
    const court = await Court.findById(courtId);
    if (!court) res.status(404).json({ message: "Court not found" });

    const uniquePlayers = court.checkinPlayers.reduce((acc, obj) => {
      const exists = acc.some((item) => item.username === obj.username);
      if (!exists) {
        acc.push(obj);
      }
      return acc;
    }, []);

    res
      .status(200)
      .json({ players: court.players, checkinPlayers: uniquePlayers });
  } catch (e) {
    res.status(500).json({ message: "Unknown error" });
  }
};
