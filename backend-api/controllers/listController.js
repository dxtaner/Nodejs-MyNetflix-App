// controllers/listController.js

const mongoose = require("mongoose");
const List = require("../models/List.js");
const Movie = require("../models/Movie.js");
const User = require("../models/User");

exports.createList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }

    const content = [];
    for (const itemId of req.body.content) {
      if (mongoose.Types.ObjectId.isValid(itemId)) {
        const movie = await Movie.findById(itemId);
        if (movie) {
          content.push(itemId);
        }
      }
    }

    if (content.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No valid movies found in content" });
    }

    const newList = await List.create({
      title: req.body.title,
      type: req.body.type,
      genre: req.body.genre,
      content: content,
    });

    res.status(201).json({
      success: true,
      message: "List created successfully",
      list: newList,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.title) {
      return res.status(400).json({
        success: false,
        message: "A list with the same title already exists",
      });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json({ success: true, lists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res
        .status(404)
        .json({ success: false, message: "List not found" });
    }
    res.status(200).json({ success: true, list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }

    const deletedList = await List.findByIdAndDelete(req.params.id);

    if (!deletedList) {
      return res
        .status(404)
        .json({ success: false, message: "List not found" });
    }

    res.status(200).json({
      success: true,
      message: "List deleted successfully",
      list: deletedList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
