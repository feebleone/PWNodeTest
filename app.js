//Dependancies
const express = require("express");
const app = express();
// const mysql = require("mysql");
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const device_routes = require("./routes/devices_routes");

// //DB Connection.
// //For now we place sensitive details in a separate file in git ignore,
// //So randos won't access public-facing DB.
// const constr = require("./dbconstr");
// const conn = mysql.createConnection(constr.dbconstrvalues);

// conn.connect(function (err) {
//   if (err) throw err;
//   console.log("You are now connected with the store.");
// });

//Allow CORS -
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method == "OPTIONS") res.sendStatus(200);
  else next();
});

app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Service Operational!"));
app.use("/devices", device_routes);

// const jsonParser = bodyparser.json();

// app.get("/devices", (req, res) => {
//   try {
//     console.log("Received a GET method.");
//     conn.query("select * from tblDevices", function (error, results, fields) {
//       if (error) throw error;
//       res.send(JSON.stringify(results));
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("Unable to process request.");
//   }
// });

// app.get("/devices/:id", (req, res) => {
//   try {
//     console.log("Received a GET single: " + req.params.id);
//     conn.query(
//       "SELECT * from tblDevices WHERE id=?",
//       [req.params.id],
//       (err, results, fields) => {
//         if (err) throw err;
//         if (results.length == 0) {
//           res.status(404).send("No records found with id " + req.params.id);
//         } else if (results.length > 1) {
//           console.log(
//             "Exception gjiji3ijg occured: Multiple records with identical keys found. Key: " +
//               req.params.id
//           );
//           res
//             .status(500)
//             .send(
//               "We had an internal error. An administrator will review the error."
//             );
//         }
//         res.send(JSON.stringify(results[0]));
//       }
//     );
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("Unable to process request.");
//   }
// });

// app.post("/devices", jsonParser, (req, res) => {
//   try {
//     console.log("Received a POST HTTP method");
//     console.log(req.body);
//     var data = {
//       id: uuidv4(),
//       name: req.body.name,
//       description: req.body.description,
//       path: req.body.path,
//     };

//     console.log("Inserting into tblDevices: " + JSON.stringify(data));
//     conn.query("INSERT INTO tblDevices SET ?", data, (err, result) => {
//       if (err) throw err;
//       console.log("Inserted " + result.affectedRows);
//       res.status(201).send(JSON.stringify(result));
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("Unable to process request.");
//   }
// });

// app.put("/devices/:id", jsonParser, (req, res) => {
//   try {
//     console.log("Received a PUT HTTP method");
//     console.log(req.body);
//     console.log(req.params.id);
//     var data = {
//       name: req.body.name,
//       description: req.body.description,
//       path: req.body.path,
//     };
//     conn.query(
//       "UPDATE tblDevices SET ? WHERE id = ?",
//       [data, req.params.id],
//       (err, result) => {
//         if (err) throw err;
//         console.log("Updated record id" + req.params.id);
//         res.send(JSON.stringify(result));
//       }
//     );
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("Unable to process request.");
//   }
// });

// app.delete("/devices/:id", (req, res) => {
//   try {
//     console.log("Received a devices/DELETE cmd for id " + req.params.id);
//     conn.query(
//       "DELETE FROM tblDevices WHERE id = ?",
//       [req.params.id],
//       (err, result) => {
//         if (err) throw err;
//         console.log("deleted device record id " + req.params.id);
//         if (result.affectedRows == 0) {
//           res.status(404).send("No records found with id " + req.params.id);
//         } else res.status(204).send();
//       }
//     );
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("Unable to process request.");
//   }
// });

// app.delete("/devices/", (req, res) => {
//   try {
//     console.log("Received a devices/DELETE ALL cmd.");
//     conn.query("DELETE FROM tblDevices", (err, result) => {
//       if (err) throw err;
//       console.log(
//         "deleted ALL (" + result.affectedRows + ") records from tblDevices"
//       );
//       if (result.affectedRows == 0) {
//         res.status(404).send("No records found.");
//       } else res.status(204).send();
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("Unable to delete ALL of the records.");
//   }
// });

app.listen(process.env.port || 3001);
console.log("Web Server is listening at port " + (process.env.port || 3001));
