module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    userId: DataTypes.INTEGER,
    data: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Todo;
};
