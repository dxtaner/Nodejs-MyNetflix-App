const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
    duration: { type: String },
    actors: [{ type: String }],
    language: { type: String },
    country: { type: String },
    awards: [{ type: String }],
    ratings: [
      {
        source: { type: String },
        value: { type: Number },
      },
    ],
    boxOffice: { type: Number },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
