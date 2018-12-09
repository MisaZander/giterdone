require("dotenv").config();
var express = require("express");
var session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Session stuff
var sessionStore = new SequelizeStore({
  db: db.sequelize,
  table: "Session",
  checkExpirationInterval: 15 * 60 * 1000, //Every 15 min
  expiration: 1 * 60 * 60 * 1000, //1 hour
  extendDefaultFields: function(defaults, session) {
    return {
      expires: defaults.expires,
      data: defaults.data,
      userId: session.userId
    };
  }
});

app.use(
  session({
    name: "userSession",
    secret: "keyboard cat",
    store: sessionStore,
    resave: false,
    proxy: false,
    saveUninitialized: true
  })
);

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
