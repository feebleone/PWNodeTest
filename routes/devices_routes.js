const express = require("express");
const bodyparser = require("body-parser");
const device_controller = require("../controllers/devices_controller");
const router = express.Router();

const jsonParser = bodyparser.json();
router.post("/", jsonParser, device_controller.addOne);
router.get("/", device_controller.getAll);
router.get("/:id", device_controller.getOne);
router.put("/:id", jsonParser, device_controller.updateOne);
router.delete("/", device_controller.deleteAll);
router.delete("/:id", device_controller.deleteOne);

module.exports = router;
