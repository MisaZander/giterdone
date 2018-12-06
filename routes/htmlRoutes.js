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
          console.log("No session stored. Next!");
          next();
        } else {
          console.log("You session userID is: " + dbData.userId);
          req.session.userId = dbData.userId;
          res.sendFile(
            path.join(__dirname, "..", "public", "html", "index.html")
          );
        }
      });
    },
    function(req, res) {
      //First visit
      res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"));
    }
  );
};
