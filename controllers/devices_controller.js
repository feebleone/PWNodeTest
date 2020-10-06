const devicesService = require("../services/devices_service");

const getAll = async (req, res, next) => {
  try {
    console.log("Received devices/GET");
    const results = await devicesService.getAll();
    res.send(JSON.stringify(results));
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    console.log("Received devices/GET/" + req.params.id);
    const results = await devicesService.getOne(req.params.id);
    if (results.length == 0) {
      res.status(404).send("No records found with id " + req.params.id);
    } else if (results.length > 1) {
      console.log("Error gjughw: Multiple recs found with PK " + req.param.id);
      res.status(500).send("Server issue.");
    } else {
      res.send(JSON.stringify(results[0]));
    }
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send("Unable to process request.");
    next(e);
  }
};

const add = async (req, res, next) => {
  try {
    const result = await devicesService.create(req.body);
    res.status(201).send(JSON.stringify(result));
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

module.exports = {
  add,
  getOne,
  getAll,
};
