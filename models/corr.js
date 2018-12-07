module.exports = function(sequelize, DataTypes) {
  var Corr = sequelize.define("Corr", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    who: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whenever: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    time: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW
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
  return Corr;
};
