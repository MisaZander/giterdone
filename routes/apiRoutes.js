var db = require("../models");

module.exports = function(app) {
  //GET it all
  app.get("/api/all/:userId", function(req, res) {
    var data = {};

    db.Todo.findAll({
      where: {
        userId: req.params.userId
      },
      order: [["complete", "ASC"], ["priority", "DESC"]]
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
          },
          order: [["complete", "ASC"], ["priority", "DESC"]]
        })
          .then(function(errandResult) {
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
              })
                .then(function(corrResult) {
                  if (corrResult === null || corrResult === undefined) {
                    //isOkay = false;
                    console.log("GET all failed at errands");
                    return res.status(500);
                  } else {
                    data.errands = errandResult;
                    db.Corr.findAll({
                      where: {
                        userId: req.params.userId
                      },
                      order: [["complete", "ASC"], ["priority", "DESC"]]
                    })
                      .then(function(corrResult) {
                        if (corrResult === null || corrResult === undefined) {
                          //isOkay = false;
                          console.log("GET all failed at corrs");
                          return res.status(500);
                        } else {
                          data.correspondence = corrResult;
                          //console.log(data);
                          return res.status(200).json(data);
                        }
                      })
                      .catch(db.Sequelize.ValidationError, function(err) {
                        return handleError(err, res);
                      });
                    return null;
                  }
                })
                .catch(db.Sequelize.ValidationError, function(err) {
                  return handleError(err, res);
                });
              return null;
            }
          })
          .catch(db.Sequelize.ValidationError, function(err) {
            return handleError(err, res);
          });
      }
    });

    //Post a new entry to the todo table
    app.post("/api/todos", function(req, res) {
      if (!req.body.userId) {
        console.log(req.body.userId);
        console.log("No userId set in this todo POST request");
        return res.status(400).end("userId missing or invalid");
      }
      db.Todo.create({
        data: req.body.data,
        priority: req.body.priority,
        userId: req.body.userId
      })
        .then(function(dbResult) {
          if (dbResult.affectedRows === 0) {
            console.log("Incoming POST request failed.");
            return res.status(500);
          } else {
            return res.status(200).json(dbResult);
          }
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });

    //post a new entry to the errand table
    app.post("/api/errands", function(req, res) {
      if (!req.body.userId) {
        console.log("No userId set in this errand POST request");
        return res.status(400).end("userId missing or invalid");
      }
      db.Errand.create({
        data: req.body.data,
        where: req.body.where,
        priority: req.body.priority,
        userId: req.body.userId
      })
        .then(function(dbResult) {
          if (dbResult.affectedRows === 0) {
            console.log("Incoming POST request failed.");
            return res.status(500);
          } else {
            return res.status(200).json(dbResult);
          }
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });

    //post a new entry to the corr table
    app.post("/api/corrs", function(req, res) {
      if (!req.body.userId) {
        console.log("No userId set in this corr POST request");
        return res.status(400).end("userId missing or invalid");
      }
      db.Corr.create({
        data: req.body.data,
        who: req.body.who,
        whenever: true,
        priority: req.body.priority,
        userId: req.body.userId
      })
        .then(function(dbResult) {
          if (dbResult.affectedRows === 0) {
            console.log("Incoming POST request failed.");
            return res.status(500);
          } else {
            return res.status(200).json(dbResult);
          }
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });

    //Change the complete value of a todo item
    app.put("/api/todos", function(req, res) {
      if (!req.body.id) {
        console.log("IDless PUT sent");
        return res.status(400);
      }
      db.Todo.update(
        {
          complete: req.body.newComplete === "true" ? true : false
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
        .then(function(dbResult) {
          if (!dbResult) {
            console.log("Incoming PUT request failed.");
            return res.status(500);
          } else {
            return res.status(200).json(dbResult);
          }
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });

    //Change the complete value of an errand item
    app.put("/api/errands", function(req, res) {
      if (!req.body.id) {
        console.log("IDless PUT sent");
        return res.status(400);
      }
      db.Errand.update(
        {
          complete: req.body.newComplete === "true" ? true : false
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
        .then(function(dbResult) {
          if (!dbResult) {
            console.log("Incoming PUT request failed.");
            return res.status(500);
          } else {
            return res.status(200).json(dbResult);
          }
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });

    //Change the complete value of a corr item
    app.put("/api/corrs", function(req, res) {
      if (!req.body.id) {
        console.log("IDless PUT sent");
        return res.status(400);
      }
      db.Corr.update(
        {
          complete: req.body.newComplete === "true" ? true : false
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
        .then(function(dbResult) {
          if (!dbResult) {
            console.log("Incoming PUT request failed.");
            return res.status(500);
          } else {
            return res.status(200).json(dbResult);
          }
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });

    //Drop a todo item
    app.delete("/api/todos", function(req, res) {
      console.log(req.body);
      db.Todo.destroy({
        where: {
          id: req.body.id
        }
      })
        .then(function(dbResult) {
          return res.status(200).json(dbResult);
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });

    //Drop an errand item
    app.delete("/api/errands", function(req, res) {
      db.Errand.destroy({
        where: {
          id: req.body.id
        }
      })
        .then(function(dbResult) {
          return res.status(200).json(dbResult);
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });

    //Drop a corr item
    app.delete("/api/corrs", function(req, res) {
      db.Corr.destroy({
        where: {
          id: req.body.id
        }
      })
        .then(function(dbResult) {
          return res.status(200).json(dbResult);
        })
        .catch(db.Sequelize.ValidationError, function(err) {
          return handleError(err, res);
        });
    });
  });
};

//Handle query errors
function handleError(err, res) {
  if (err.errors[0].validatorName === "notEmpty") {
    console.log("A request was made with missing params.");
    return res
      .status(400)
      .end("One or more data members was incomplete in your request.");
  } else if (err.errors[0].validatorKey === "is_null") {
    console.log("A request was made with one or more null params");
    return res
      .status(400)
      .end("One or more data members was totally missing in your request.");
  } else {
    console.log("A request was made that blew the server's mind.");
    console.log("Sequelize message: " + err.errors[0].message);
    return res.status(500).json(err.errors);
  }
}
