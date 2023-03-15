import Marker from "../models/Marker.js";

export const getMarkers = async (req, res) => {
    try {
      const markers = await Marker.find();
      res.status(200).json(markers);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  