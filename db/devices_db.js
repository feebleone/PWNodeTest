const mysql = require("mysql");
const dbasynchelper = require("../utils/mysql_promise_wrapper");
//DB Connection.
//For now we place sensitive details in a separate file in git ignore,
//So randos won't access public-facing DB.
const constr = require("../dbconstr");
const conn = dbasynchelper.makeDb(constr.dbconstrvalues);
// const conn = mysql.createConnection(constr.dbconstrvalues);
console.log("created connection.");

// conn.connect(function (err) {
//   if (err) throw err;
//   console.log("You are now connected with the store.");
// });

const getAll = async () => {
  const results = await conn.query("select * from tblDevices");
  console.log("retrieved " + results.length + " recs.");
  return results;
};

const getOne = async (id) => {
  const results = await conn.query("SELECT * from tblDevices WHERE id=?", [id]);
  console.log("retrieved " + results.length + " rec.");
  return results;
};

const addOne = async (device) => {
  const result = await conn.query("INSERT INTO tblDevices SET ?", device);
  console.log("Inserted " + result.affectedRows);
  return result;
};

const updateOne = async (device) => {
  const result = await conn.query("UPDATE tblDevices SET ? WHERE id = ?", [
    device,
    device.id,
  ]);
  console.log("Updated record id" + device.id);
  return result;
};

const deleteOne = async (id) => {
  const result = await conn.query("DELETE FROM tblDevices WHERE id = ?", [id]);
  console.log("deleted device record id " + id);
  return result;
};

const deleteAll = async () => {
  const result = await conn.query("DELETE FROM tblDevices");
  console.log("deleted ALL (" + result.affectedRows + ") from tblDevices");
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
