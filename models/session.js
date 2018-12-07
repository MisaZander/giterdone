module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return Session;
};
