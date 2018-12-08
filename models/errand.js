module.exports = function(sequelize, DataTypes) {
  var Errand = sequelize.define("Errand", {
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
    where: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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

  Errand.associate = function(models) {
    Errand.belongsTo(models.Session, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "CASCADE",
      hooks: true
    });
  };
  return Errand;
};
