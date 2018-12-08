var db = require("../models");

module.exports = function(app) {
  //GET it all
  app.get("/api/all/:userId", function(req, res) {
    var data = {};

    db.Todo.findAll({
      where: {
        userId: req.params.userId
      }
    }).then(function(todoResult) {
      //var data = {};
      if (todoResult === null || todoResult === undefined) {
        //isOkay = false;
        console.log("GET all failed at todo");
        res.status(500);
        return;
      } else {
        data.todos = todoResult;
        db.Errand.findAll({
          where: {
            userId: req.params.userId
          }
        }).then(function(errandResult) {
          if (errandResult === null || errandResult === undefined) {
            //isOkay = false;
            console.log("GET all failed at errands");
            res.status(500);
            return;
          } else {
            data.errands = errandResult;
            db.Corr.findAll({
              where: {
                userId: req.params.userId
              }
            }).then(function(corrResult) {
              if (corrResult === null || corrResult === undefined) {
                //isOkay = false;
                console.log("GET all failed at corrs");
                res.status(500);
                return;
              } else {
                data.correspondence = corrResult;
                //console.log(data);
                res.status(200).json(data);
              }
            });
          }
        });
      }
    });
  });

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
      console.log(req.body.userId);
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

  app.put("/api/todos", function(req, res) {
    if (!req.body.id) {
      console.log("IDless PUT sent");
      res.status(400);
      return;
    }
    db.Todo.update(
      {
        complete: req.body.newComplete ? true : false
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbResult) {
      if (!dbResult) {
        console.log("Incoming PUT request failed.");
        res.status(500);
      } else {
        res.status(200).json(dbResult);
      }
    });
  });

  app.put("/api/errands", function(req, res) {
    if (!req.body.id) {
      console.log("IDless PUT sent");
      res.status(400);
      return;
    }
    db.Errand.update(
      {
        complete: req.body.newComplete ? true : false
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbResult) {
      if (!dbResult) {
        console.log("Incoming PUT request failed.");
        res.status(500);
      } else {
        res.status(200).json(dbResult);
      }
    });
  });

  app.put("/api/corrs", function(req, res) {
    if (!req.body.id) {
      console.log("IDless PUT sent");
      res.status(400);
      return;
    }
    db.Corr.update(
      {
        complete: req.body.newComplete ? true : false
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbResult) {
      if (!dbResult) {
        console.log("Incoming PUT request failed.");
        res.status(500);
      } else {
        res.status(200).json(dbResult);
      }
    });
  });

  app.delete("/api/todos", function(req, res) {
    db.Todo.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(dbResult) {
      res.status(200).json(dbResult);
    });
  });

  app.delete("/api/errands", function(req, res) {
    db.Errand.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(dbResult) {
      res.status(200).json(dbResult);
    });
  });

  app.delete("/api/corrs", function(req, res) {
    db.Corr.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(dbResult) {
      res.status(200).json(dbResult);
    });
  });
};
