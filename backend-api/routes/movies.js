const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController.js");
const verifyToken = require("../middlewares/auth");

router.get("/", movieController.getAllMovies);
router.post("/", verifyToken, movieController.createMovie);
router.get("/random", movieController.getRandomMovie);

router.get("/:id", movieController.getMovieById);
router.patch("/:id", verifyToken, movieController.updateMovie);
router.delete("/:id", verifyToken, movieController.deleteMovie);

module.exports = router;
