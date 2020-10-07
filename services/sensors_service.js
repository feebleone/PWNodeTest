const db = require("../db/sensors_db");

//const sensors = db.sensors;
const { v4: uuidv4 } = require("uuid");

const getAll = async () => {
  const results = await db.getAll();
  // const results = await sensors.findAll
  return results;
};

const addOne = async (data) => {
  var inst = {
    name: data.name,
    deviceID: data.deviceID,
  };
  const result = await db.addOne(inst);
  return result;
};

module.exports = {
  getAll,
  addOne,
};
