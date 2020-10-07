const sensorsService = require("../services/sensors_service");

const getAll = async (req, res, next) => {
  try {
    console.log("Received sensors/GET");
    const results = await sensorsService.getAll();
    res.send(JSON.stringify(results));
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    console.log("Received sensors/GET/" + req.params.id);
    const results = await sensorsService.getOne(req.params.id);
    if (results.length == 0) {
      res.status(404).send("No sensors found with id " + req.params.id);
    } else if (results.length > 1) {
      console.log(
        "Error gjughw: Multiple sensors found with PK " + req.param.id
      );
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

const addOne = async (req, res, next) => {
  try {
    const result = await sensorsService.addOne(req.body);
    res.status(201).send(JSON.stringify(result));
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
    next(e);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const result = await sensorsService.updateOne(req.body);
    res.send(JSON.stringify(result));
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send("Unable to update device with id " + req.body.id);
    next(e);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const result = await sensorsService.deleteOne(req.params.id);
    if (result.affectedRows == 0) {
      res.status(404).send("No sensors found with id " + req.params.id);
    } else res.status(204).send();
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send("Unable to process request.");
  }
};

const deleteAll = async (req, res, next) => {
  try {
    const result = await sensorsService.deleteAll();
    if (result.affectedRows == 0) {
      res.status(404).send("No sensors found");
    } else res.status(204).send("Deleted " + result.affectedRows + " sensors.");
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send("Unable to delete all sensors.");
    next(e);
  }
};

module.exports = {
  addOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
  deleteAll,
};
