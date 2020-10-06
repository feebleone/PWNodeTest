const express = require("express");
const bodyparser = require("body-parser");
const device_controller = require("../controllers/devices_controller");
const router = express.Router();

const jsonParser = bodyparser.json();
router.post("/", jsonParser, device_controller.add);
router.get("/", device_controller.getAll);
router.get("/:id", device_controller.getOne);

module.exports = router;
