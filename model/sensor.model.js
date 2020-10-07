const { Sequelize, Model, DataTypes } = require("sequelize");
// https://sequelize.org/master/manual/model-basics.html#data-types
//Common col options:
//primaryKey: true
//defaultValue: (DataTypes.NOW || Sequelize.UUIDV4)
//allowNull: false
//unique constraint: unique:true, or unique 'compositeIdx'
//comment: 'txt'
module.exports = (sequelize, Sequelize) => {
  const Sensor = sequelize.define(
    "sensor",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      deviceID: { type: Sequelize.UUID, allowNull: false },
    },
    {
      indexes: [{ type: "FULLTEXT", name: "text_idx", fields: ["name"] }],
    }
  );
};
// export default Sensor;}
