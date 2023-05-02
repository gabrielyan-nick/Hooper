import Court from "../models/Court.js";
import Marker from "../models/Marker.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { agenda } from "../index.js";

export const addCourt = async (req, res) => {
  try {
    const { geometry, sport } = req.body;
    const newCourt = new Court(req.body);

    const newMarker = new Marker({
      properties: { courtId: newCourt._id, sport },
      geometry,
    });
    await newMarker.save();

    const newCourtChat = new Chat({
      courtId: newCourt._id,
    });
    await newCourtChat.save();

    newCourt.chatId = newCourtChat._id;
    await newCourt.save();

    res.status(200).json(newCourt);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export const getCourt = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id).populate({
      path: "chatId",
      populate: {
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 3 },
        populate: {
          path: "sender",
          select: "picturePath",
        },
      },
    });

    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }

    res.status(200).json({
      cover: court.cover,
      hoopsCount: court.hoopsCount,
      lighting: court.lighting,
      geometry: court.geometry,
      messages: court.chatId.messages,
      chatId: court.chatId._id,
      name: court.name,
      photos: court.photos,
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
        coordinates: court.geometry.coordinates,
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

    const user = await User.findById(_id);
    if (!user) res.status(404).json({ message: "User not found" });
    const court = await Court.findById(courtId);
    if (!court) res.status(404).json({ message: "Court not found" });

    if (user.onCourt.isOnCourt) {
      const prevCourt = await Court.findById(user.onCourt.courtId);
      prevCourt.players = prevCourt.players.filter(
        (player) => player._id != _id
      );
      await prevCourt.save();
    }

    court.checkinPlayers.unshift({
      _id,
      username,
    });

    court.players.unshift({
      _id,
      username,
    });

    user.onCourt.isOnCourt = true;
    user.onCourt.courtId = courtId;

    await user.save();
    await court.save();

    const jobName = `checkOut-user-${_id}`;
    const jobs = await agenda.jobs({ name: jobName });

    if (jobs.length > 0) {
      await agenda.cancel({ name: jobName });
    }

    agenda.define(jobName, async (job) => {
      try {
        const user = await User.findById(_id);
        const court = await Court.findById(courtId);
        const index = court.players.findIndex((player) => player._id == _id);
        console.log("          START        ");
        if (index !== -1) {
          court.players.splice(index, 1);
          user.onCourt.isOnCourt = false;
          user.onCourt.courtId = null;
          console.log("          DONE        ");
          await user.save();
          await court.save();
        }
        job.remove(() => console.log("          REMOVE        "));
      } catch (e) {
        console.log(e);
      }
    });

    const now = new Date();
    const scheduleTime = new Date(now.getTime() + 30 * 60 * 1000);
    agenda.schedule(scheduleTime, jobName);

    res.status(200).json(user.onCourt);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const checkOutOnCourt = async (req, res) => {
  try {
    const { courtId } = req.params;
    const { _id } = req.body;

    const user = await User.findById(_id);
    if (!user) res.status(404).json({ message: "User not found" });
    const court = await Court.findById(courtId);
    if (!court) res.status(404).json({ message: "Court not found" });

    const isOnCourt = court.players.some((player) => player._id == _id);
    if (isOnCourt) {
      court.players = court.players.filter((player) => player._id != _id);
    }

    user.onCourt.isOnCourt = false;
    user.onCourt.courtId = null;

    await user.save();
    await court.save();

    const jobName = `checkOut-user-${_id}`;
    const jobs = await agenda.jobs({ name: jobName });

    if (jobs.length > 0) {
      await agenda.cancel({ name: jobName });
    }

    res.status(200).json(user.onCourt);
  } catch (e) {
    res.status(500).json({ message: e.message });
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

export const updateCourtInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const court = await Court.findById(id);
    if (!court) res.status(404).json({ message: "Court not found" });

    let dataObj;
    if (data.photos) {
      if (court.photos.length === 1 && court.photos[0].startsWith("/assets")) {
        court.photos = [data.photos];
      } else {
        court.photos.unshift(data.photos);
      }

      const uniquePhotos = [...new Set(court.photos)];

      dataObj = {
        photos: uniquePhotos,
      };
    } else dataObj = data;

    if (dataObj.sport && dataObj.sport !== court.sport) {
      await Marker.findOneAndUpdate(
        {
          "properties.courtId": court.id,
        },
        {
          "properties.sport": dataObj.sport,
        },
        { new: true }
      );
      if (court.photos.length === 1 && court.photos[0].startsWith("/assets")) {
        if (dataObj.sport === "basketball")
          court.photos.splice(0, 1, "/assets/basketball-court-notprivate.jpg");
        else if (dataObj.sport === "football")
          court.photos.splice(0, 1, "/assets/football-court-notprivate.jpg");
        await court.save();
      }
    }

    const updatedCourt = await Court.findByIdAndUpdate(
      id,
      { ...dataObj },
      { new: true }
    );
    res.status(200).json({ message: "Successful" });
  } catch (e) {
    res.status(500).json({ message: "Unknown error" });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { chatId, courtId } = req.params;
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 50;

    const court = await Court.findById(courtId);
    if (!court) return res.status(404).json({ message: "C not found" });

    const messages = await Message.find({ chatId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("sender", "picturePath _id")
      .exec();

    if (!messages) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json({ messages, courtSport: court.sport });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const postChatMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId, text } = req.body;

    if (!userId || !text)
      return res
        .status(404)
        .json({ message: "Please, provide all fields to send message" });

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const newMessage = new Message({
      sender: userId,
      chatId,
      text,
    });
    await newMessage.save();

    chat.messages.push(newMessage._id);
    await chat.save();

    res.status(200).json(newMessage);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteChatMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    await Message.findByIdAndDelete(messageId);
    const chat = await Chat.findById(chatId);
    chat.messages = chat.messages.filter(
      (message) => message.toString() !== messageId
    );
    await chat.save();

    res.status(200).json("Successful");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateChatMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { text },
      { new: true }
    );

    res.status(200).json(updatedMessage);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
