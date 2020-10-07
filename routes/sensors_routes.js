const express = require("express");
const bodyparser = require("body-parser");
const sensor_controller = require("../controllers/sensors_controller");
const router = express.Router();

const jsonParser = bodyparser.json();
router.post("/", jsonParser, sensor_controller.addOne);
router.get("/", sensor_controller.getAll);
router.get("/:id", sensor_controller.getOne);
router.put("/:id", jsonParser, sensor_controller.updateOne);
router.delete("/", sensor_controller.deleteAll);
router.delete("/:id", sensor_controller.deleteOne);

module.exports = router;
