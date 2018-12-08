module.exports = function(sequelize, DataTypes) {
  var Corr = sequelize.define("Corr", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    who: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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

  Corr.associate = function(models) {
    Corr.belongsTo(models.Session, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });
  };
  return Corr;
};
