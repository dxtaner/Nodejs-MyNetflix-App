const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const upload = require("./middlewares/upload");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const movieRoute = require("./routes/movies.js");
const listRoute = require("./routes/lists.js");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

app.use(express.json());
app.use(upload.single("profilePic"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
