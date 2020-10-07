const db = require("../db/sensors_db");

//const sensors = db.sensors;
const { v4: uuidv4 } = require("uuid");

const getAll = async (tofind = null) => {
  const results = await db.getAll(tofind);
  // const results = await sensors.findAll
  return results;
};

const getOne = async (id) => {
  return await db.getOne(id);
};

const updateOne = async (data) => {
  var sensor = {
    id: data.id,
    name: data.name,
    deviceID: data.deviceID,
  };
  const result = await db.updateOne(sensor);
};

const addOne = async (data) => {
  var inst = {
    name: data.name,
    deviceID: data.deviceID,
  };
  const result = await db.addOne(inst);
  return result;
};

const deleteOne = async (id) => {
  return await db.deleteOne(id);
};

const deleteAll = async () => {
  return await db.deleteAll();
};

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  deleteAll,
};
