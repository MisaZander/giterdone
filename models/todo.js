//Initialze the todo table for sequelize
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
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
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  //Associate a foreign key that references the session table
  Todo.associate = function(models) {
    Todo.belongsTo(models.Session, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "CASCADE",
      hooks: true
    });
  };
  return Todo;
};
