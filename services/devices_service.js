//Add stores (mysql, reddis, ORMs, etc..)
const devicesDB = require("../db/devices_db");
const { v4: uuidv4 } = require("uuid");

const create = async (data) => {
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

const getAll = async () => {
  const results = await devicesDB.getAll();
  return results;
};

module.exports = {
  create,
  getOne,
  getAll,
};
