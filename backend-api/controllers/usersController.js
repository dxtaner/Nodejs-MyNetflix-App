// controllers/usersController.js

const User = require("../models/User");

exports.updateProfilePic = async (req, res) => {
  try {
    console.log("Profile picture path:", req.file.path);
    const profilePic = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic },
      { new: true }
    );

    console.log("Updated user:", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile picture update error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    const id = req.params.id;
    const isAdmin = user.isAdmin;

    if (isAdmin || id === req.user._id) {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "User updated successfully", user });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    const id = req.params.id;
    const isAdmin = user.isAdmin;

    if (isAdmin || id === req.user._id) {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "User deleted successfully", user });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }
  } catch (error) {
    console.error("User deletion error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.isAdmin) {
      res.status(403).json({ success: false, message: "Unauthorized access!" });
      return;
    }
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.isAdmin) {
      res.status(403).json({ success: false, message: "Unauthorized access!" });
      return;
    }
    const userStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          avgAge: { $avg: "$age" },
        },
      },
    ]);
    res.status(200).json({ success: true, userStats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
