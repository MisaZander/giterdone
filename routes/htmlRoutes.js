var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

  app.get(
    "/",
    function(req, res, next) {
      //console.log(req.session.id);
      // db.Session.findOne({
      //   where: {
      //     sid: req.sessionID
      //   }
      // })
      //   .then(function(dbData) {
      //     console.log(req.sessionID);
      //     if () {
      //       console.log("User ID: " + dbData.userId);
      //     }
      //     res.sendFile(
      //       path.join(__dirname, "..", "public", "html", "index.html")
      //     );
      //   })
      //   .catch(function(err) {
      //     if (err) {
      //       throw err;
      //     }
      //     //console.log(err);
      //     res.end("Oops");
      //   });

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
