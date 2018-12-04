module.exports = function(sequelize, DataTypes) {
  var Corr = sequelize.define("Corr", {
    userId: DataTypes.INTEGER,
    data: DataTypes.STRING,
    who: DataTypes.STRING,
    whenever: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    time: DataTypes.TIME,
    priority: DataTypes.INTEGER,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Corr;
};
