var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res, next) {
        if(req.session.views) {
            req.session.views++;
            //res.send("Page viewed " + req.session.views + " times.");
            res.render("index", {views: req.session.views});
        } else {
            req.session.views = 1;
            //res.send("Welcome aboard");
            res.render("index", {views: req.session.views});
        }
    });
}