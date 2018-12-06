var db = require("../models");

module.exports = function(app) {
  //Obtain all todos for a user
  app.get("/api/todos", function(req, res) {
    if (!req.body.userId) {
      console.log("No userId set in this todo GET request");
      res.status(400).end("userId missing or invalid");
      return;
    }
    db.Todo.findAll({
      where: {
        userId: req.body.userId
      }
    }).then(function(dbResult) {
      if (dbResult === null || dbResult === undefined) {
        res.status(404);
        return;
      }
      res.status(200).json(dbResult);
    });
  });

  app.get("/api/errands", function(req, res) {
    if (!req.body.userId) {
      console.log("No userId set in this errand GET request");
      res.status(400).end("userId missing or invalid");
      return;
    }
    db.Errand.findAll({
      where: {
        userId: req.body.userId
      }
    }).then(function(dbResult) {
      if (dbResult === null || dbResult === undefined) {
        res.status(404);
        return;
      }
      res.status(200).json(dbResult);
    });
  });

  app.get("/api/corrs", function(req, res) {
    if (!req.body.userId) {
      console.log("No userId set in this corr GET request");
      res.status(400).end("userId missing or invalid");
      return;
    }
    db.Corr.findAll({
      where: {
        userId: req.body.userId
      }
    }).then(function(dbResult) {
      if (dbResult === null || dbResult === undefined) {
        res.status(404);
        return;
      }
      res.status(200).json(dbResult);
    });
  });

  app.post("/api/todos", function(req, res) {
    if (!req.body.userId) {
      console.log("No userId set in this todo POST request");
      res.status(400).end("userId missing or invalid");
      return;
    }
    db.Todo.create({
      data: req.body.data,
      priority: req.body.priority,
      userId: req.body.userId
    }).then(function(dbResult) {
      if (dbResult.affectedRows === 0) {
        console.log("Incoming POST request failed.");
        res.status(500);
      } else {
        res.status(200).json(dbResult);
      }
    });
  });

  app.post("/api/errands", function(req, res) {
    if (!req.body.userId) {
      console.log("No userId set in this errand POST request");
      res.status(400).end("userId missing or invalid");
      return;
    }
    db.Errand.create({
      data: req.body.data,
      where: req.body.where,
      priority: req.body.priority,
      userId: req.body.userId
    }).then(function(dbResult) {
      if (dbResult.affectedRows === 0) {
        console.log("Incoming POST request failed.");
        res.status(500);
      } else {
        res.status(200).json(dbResult);
      }
    });
  });

  app.post("/api/corrs", function(req, res) {
    if (!req.body.userId) {
      console.log("No userId set in this corr POST request");
      res.status(400).end("userId missing or invalid");
      return;
    }
    db.Corr.create({
      data: req.body.data,
      who: req.body.who,
      whenever: true,
      priority: req.body.priority,
      userId: req.body.userId
    }).then(function(dbResult) {
      if (dbResult.affectedRows === 0) {
        console.log("Incoming POST request failed.");
        res.status(500);
      } else {
        res.status(200).json(dbResult);
      }
    });
  });
};
