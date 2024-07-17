// routes/listRoutes.js

const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const auth = require("../middlewares/auth");

router.use(auth);

router.post("/", listController.createList);

router.get("/", listController.getAllLists);

router.get("/:id", listController.getListById);
router.delete("/:id", listController.deleteList);

module.exports = router;
