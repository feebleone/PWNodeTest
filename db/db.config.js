const { Sequelize, DataTypes } = require("sequelize");
const con = require("../dbconstr");
const sequelize = new Sequelize(
  con.dbconstrvalues.database,
  con.dbconstrvalues.user,
  con.dbconstrvalues.password,
  {
    host: con.dbconstrvalues.host,
    dialect: "mysql",
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection up!");
  } catch (e) {
    console.error("DB Connection down.", e);
  }
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.testConnection = testConnection;
db.Sensor = require("../model/sensor.model")(sequelize, Sequelize);
db.Device = require("../model/device.model")(sequelize, Sequelize);

module.exports = db;
