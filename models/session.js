module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Session.associate = function(models) {
    Session.hasMany(models.Todo, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "cascade"
    });

    Session.hasMany(models.Errand, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "cascade"
    });

    Session.hasMany(models.Corr, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  return Session;
};
