const db = require("./db.config");
const sensors = db.sequelize.models.sensor;

const getAll = async (tofind) => {
  if (tofind == null) {
    const results = await sensors.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return results;
  }
  const results = await sensors.findAll({
    where: db.Sequelize.literal("MATCH (name) AGAINST (:name)"),
    replacements: {
      name: tofind,
    },
  });
  return results;
};

const getOne = async (id) => {
  const results = await sensors.findAll({ where: { id: id } });
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

const updateOne = async (sensor) => {
  const result = await sensors.update(
    { name: sensor.name, deviceID: sensor.deviceID },
    { where: { id: sensor.id } }
  );
  return result;

  //   const result = await conn.query("UPDATE sensors SET ? WHERE id = ?", [
  //     sensor,
  //     sensor.id,
  //   ]);
  //   console.log("Updated sensor id" + device.id);
  //   return result;
};

const deleteOne = async (id) => {
  const result = await sensors.destroy({
    where: {
      id: id,
    },
  });
  return result;
};

const deleteAll = async () => {
  const result = await sensors.destroy({ truncate: true });
  return result;
};

module.exports = {
  getAll,
  addOne,
  getOne,
  updateOne,
  deleteOne,
  deleteAll,
};
