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
    "device",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      path: { type: Sequelize.STRING, allowNull: false },
    },
    {
      indexes: [
        {
          type: "FULLTEXT",
          name: "text_idx",
          fields: ["name", "description", "path"],
        },
      ],
    }
  );
};
// export default Sensor;}
