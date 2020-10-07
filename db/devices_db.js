const mysql = require("mysql");
const dbasynchelper = require("../utils/mysql_promise_wrapper");
//DB Connection.
//For now we place sensitive details in a separate file in git ignore,
//So randos won't access public-facing DB.
const constr = require("../dbconstr");
const conn = dbasynchelper.makeDb(constr.dbconstrvalues);
// const conn = mysql.createConnection(constr.dbconstrvalues);
console.log("created connection.");

const db = require("../db/db.config");
const devices = db.sequelize.models.device;

// conn.connect(function (err) {
//   if (err) throw err;
//   console.log("You are now connected with the store.");
// });

// const getAll = async () => {
//   const results = await conn.query("select * from tblDevices");
//   console.log("retrieved " + results.length + " recs.");
//   return results;
// };

const getAll = async (tofind) => {
  // const results = await devicesDB.getAll();

  if (tofind == null) {
    const results = await conn.query("select * from devices");
    return results;
  }
  const results = await devices.findAll({
    where: db.Sequelize.literal(
      "MATCH (name,description,path) AGAINST (:name)"
    ),
    replacements: {
      name: tofind,
    },
  });
  return results;
};

const getOne = async (id) => {
  const results = await conn.query("SELECT * from devices WHERE id=?", [id]);
  console.log("retrieved " + results.length + " rec.");
  return results;
};

const addOne = async (data) => {
  const inst = devices.build({
    name: data.name,
    description: data.description,
    path: data.path,
  });

  const result = await inst.save();
  console.log("Inserted new device with id " + result.id);
  return result;

  //   const result = await conn.query("INSERT INTO devices SET ?", device);
  //   console.log("Inserted " + result.affectedRows);
  //   return result;
};

const updateOne = async (device) => {
  const result = await conn.query("UPDATE devices SET ? WHERE id = ?", [
    device,
    device.id,
  ]);
  console.log("Updated record id" + device.id);
  return result;
};

const deleteOne = async (id) => {
  const result = await conn.query("DELETE FROM devices WHERE id = ?", [id]);
  console.log("deleted device record id " + id);
  return result;
};

const deleteAll = async () => {
  const result = await conn.query("DELETE FROM devices");
  console.log("deleted ALL (" + result.affectedRows + ") from devices");
  return result;
};

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  deleteAll,
};
