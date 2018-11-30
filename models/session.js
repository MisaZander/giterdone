//var session = require("express-session");
//var SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sid: DataTypes.STRING,
        expires: DataTypes.DATE,
        data: DataTypes.TEXT
    });

    return Session;
};