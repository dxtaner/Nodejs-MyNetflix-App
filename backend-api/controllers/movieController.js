const Movie = require("../models/Movie");
const User = require("../models/User");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }

    const newMovie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      movie: newMovie,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, movie });
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }

    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getRandomMovie = async (req, res) => {
  try {
    const movies = await Movie.find();

    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    res.status(200).json({ success: true, movie: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
