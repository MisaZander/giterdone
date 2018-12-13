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

//Set session expiry based on environment
var expiration, interval;
if (process.env.NODE_ENV === "staging") {
  expiration = 5 * 60 * 1000; //5min
  interval = 5 * 60 * 1000; //Every 5 min
} else if (process.env.NODE_ENV === "demo") {
  expiration = 60 * 1000; //1 min
  interval = 60 * 1000; //Every 15 min
} else {
  expiration = 48 * 60 * 60 * 1000; //48 hours
  interval = 15 * 60 * 1000; //15 mins
}

//Setup session storage database
var sessionStore = new SequelizeStore({
  db: db.sequelize,
  table: "Session",
  checkExpirationInterval: interval,
  expiration: expiration,
  extendDefaultFields: function(defaults, session) {
    return {
      expires: defaults.expires,
      data: defaults.data,
      userId: session.userId
    };
  }
});

//Signal browser to use the session
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

//Use Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Starting the server ------------------------------------/
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
