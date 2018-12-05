module.exports = function(sequelize, DataTypes) {
  var Errand = sequelize.define("Errand", {
    userId: DataTypes.INTEGER,
    data: DataTypes.STRING,
    where: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Errand;
};
