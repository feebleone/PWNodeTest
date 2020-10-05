//Dependancies
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

//DB Connection.
//For now we place sensitive details in a separate file in git ignore,
//So randos won't access public-facing DB.
const constr = require("./dbconstr");
const conn = mysql.createConnection(constr.dbconstrvalues);

conn.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected with the store.");
});

//Allow CORS -
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

const jsonParser = bodyparser.json();

app.get("/devices", (req, res) => {
  console.log("Received a GET method.");
  conn.query("select * from tblDevices", function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get("/devices", (req, res) => {
  console.log("Received a GET method.");
  conn.query("select * from tblDevices", function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get("/devices/:id", (req, res) => {
  console.log("Received a GET single: " + req.params.id);
  conn.query(
    "SELECT * from tblDevices WHERE id=?",
    [req.params.id],
    (err, results, fields) => {
      if (err) throw err;
      res.send(JSON.stringify(results));
    }
  );
});

app.post("/devices", jsonParser, (req, res) => {
  try {
    console.log("Received a POST HTTP method");
    console.log(req.body);
    var data = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      path: req.body.path,
    };

    console.log("Inserting into tblDecvices: " + data.stringify());
    conn.query("INSERT INTO tblDevices SET ?", data, (err, result) => {
      if (err) throw err;
      console.log("Inserted " + result.affectedRows);
      res.end(JSON.stringify(result));
    });
  } catch (e) {
    console.log(e);
  }
});

app.put("/devices", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

app.delete("/devices", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

app.listen(process.env.port || 3001);
console.log("Web Server is listening at port " + (process.env.port || 3001));
