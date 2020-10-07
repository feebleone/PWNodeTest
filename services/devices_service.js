//Add stores (mysql, reddis, ORMs, etc..)
const devicesDB = require("../db/devices_db");

const db = require("../db/db.config");
const devices = db.sequelize.models.device;

const { v4: uuidv4 } = require("uuid");

const addOne = async (data) => {
  try {
    var device = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      path: data.path,
    };
    const result = await devicesDB.addOne(device);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getOne = async (id) => {
  try {
    return await devicesDB.getOne(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAll = async (tofind = null) => {
  const results = await devicesDB.getAll(tofind);
  return results;
};

const updateOne = async (data) => {
  try {
    var device = {
      id: data.id,
      name: data.name,
      description: data.description,
      path: data.path,
    };
    const result = await devicesDB.updateOne(device);
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteOne = async (id) => {
  return await devicesDB.deleteOne(id);
};

const deleteAll = async () => {
  return await devicesDB.deleteAll();
};

module.exports = {
  addOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
  deleteAll,
};
