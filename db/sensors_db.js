const db = require("./db.config");
const sensors = db.sequelize.models.sensor;

const getAll = async () => {
  const results = await sensors.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return results;
};

const addOne = async (data) => {
  const inst = sensors.build({
    name: data.name,
    deviceID: data.deviceID,
  });

  const newsensor = await inst.save();
  console.log("Inserted new sensor with id " + newsensor.id);
  return newsensor;
};

module.exports = {
  getAll,
  addOne,
};
