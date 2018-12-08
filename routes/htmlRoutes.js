var db = require("../models");
var path = require("path");

module.exports = function(app) {
  app.get(
    "/",
    function(req, res, next) {
      db.Session.findOne({
        where: {
          sid: req.sessionID
        }
      }).then(function(dbData) {
        if (dbData === null || dbData === undefined) {
          //console.log("No session stored. Next!");
          return next();
        } else {
          //console.log("You session userID is: " + dbData.userId);
          req.session.userId = dbData.userId;
          return res.sendFile(
            path.join(__dirname, "..", "public", "html", "index.html")
          );
        }
      });
    },
    function(req, res) {
      //First visit
      return res.sendFile(
        path.join(__dirname, "..", "public", "html", "index.html")
      );
    }
  );
};
