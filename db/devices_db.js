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
  conn.query(
    "SELECT * from tblDevices WHERE id=?",
    [req.params.id],
    (err, results, fields) => {
      if (err) throw err;
      console.log("retrieved " + results.length + " rec.");
      return results;
    }
  );
};

const addOne = async (device) => {
  conn.query("INSERT INTO tblDevices SET ?", device, (err, result) => {
    if (err) throw err;
    console.log("Inserted " + result.affectedRows);
    return result;
  });
};

const updateOne = async (device) => {
  conn.query(
    "UPDATE tblDevices SET ? WHERE id = ?",
    [device, device.id],
    (err, result) => {
      if (err) throw err;
      console.log("Updated record id" + device.id);
      return result;
    }
  );
};

const deleteOne = async (id) => {
  conn.query("DELETE FROM tblDevices WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    console.log("deleted device record id " + req.params.id);
    return result;
  });
};

const deleteAll = async () => {
  conn.query("DELETE FROM tblDevices", (err, result) => {
    if (err) throw err;
    console.log("deleted ALL (" + result.affectedRows + ") from tblDevices");
    return result;
  });
};

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
  deleteAll,
};
