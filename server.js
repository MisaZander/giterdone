require("dotenv").config();
var path = require("path");
var express = require("express");
var db = require("./models");
var session = require("express-session");
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/bs", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
app.use("/jq", express.static(path.join(__dirname, "node_modules", "jquery", "dist")));

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
})

app.use(session({
    name: "userSession",
    secret: "keyboard cat",
    store: sessionStore,
    resave: false,
    proxy: false,
    saveUninitialized: true
}));

require("./routes/api-routes")(app);

sessionStore.sync().then(function() {    
    app.listen(PORT, function() {
        console.log("Now listening on port " + PORT);
    });
});