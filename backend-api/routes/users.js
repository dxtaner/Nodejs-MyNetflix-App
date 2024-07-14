// routes/users.js

const router = require("express").Router();
const usersController = require("../controllers/usersController.js");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.patch("/:id", auth, usersController.updateUser);

router.delete("/:id", auth, usersController.deleteUser);

router.get("/all", auth, usersController.getAllUsers);

router.get("/:userId", auth, usersController.getUser);

router.get("/stats", auth, usersController.getUserStats);

router.patch(
  "/profile-pic",
  auth,
  upload.single("profilePic"),
  usersController.updateProfilePic
);

module.exports = router;
