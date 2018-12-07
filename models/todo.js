module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Todo;
};
