//Initialize the session table for Sequelize
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

  //Tell sequelize this table has keys for the other three associated with it and to delete
  //all rows assosiated with a user when a user is dropped
  Session.associate = function(models) {
    Session.hasMany(models.Todo, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "CASCADE",
      hooks: true
    });

    Session.hasMany(models.Errand, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "CASCADE",
      hooks: true
    });

    Session.hasMany(models.Corr, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "CASCADE",
      hooks: true
    });
  };

  return Session;
};
