var express = require("express"),
  port = process.env.PORT || 8080,
  mongoose = require("mongoose"),
  Actor = require("./api/models/actorModel"),
  Sponsorship = require("./api/models/sponsorshipModel"),
  Trip = require("./api/models/tripModel"),
  TripApplication = require("./api/models/tripApplicationModel"),
  SystemInformation = require("./api/models/systemInformationModel"),
  Finder = require("./api/models/finderModel"),
  bodyParser = require("body-parser"),
  swaggerJSDoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  app = express();



// swagger definition
var swaggerDefinition = {
  info: {
    title: "Acme Explorer API",
    version: "1.0.0",
    description: "This is the Acme Explorer API documentation"
  },
  host: "localhost:" + port,
  basePath: ""
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./api/**/*.js"],
  basePath: " / " //  Base de ruta (opcional)
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB URI building
var mongoDBUser = process.env.mongoDBUser || "adminUser";
var mongoDBPass = process.env.mongoDBPass || "password";
var mongoDBCredentials = (mongoDBUser && mongoDBPass) ? mongoDBUser + ":" + mongoDBPass + "@" : "";

var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.mongoDBPort || "27017";
var mongoDBName = process.env.mongoDBName || "ACME-Explorer";
var mongoDBURI =
  "mongodb://" + mongoDBCredentials + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;

mongoose.connect(mongoDBURI, {
  reconnectTries: 10,
  reconnectInterval: 500,
  poolSize: 10, // Up to 10 sockets
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // skip trying IPv6
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routesActors = require("./api/routes/actorRoutes");
var routesFinders = require("./api/routes/finderRoutes");
var routesSystemInformations = require("./api/routes/systemInformationRoutes");
var routesSponsorship = require("./api/routes/sponsorshipRoutes");
var routesTrips = require("./api/routes/tripRoutes");
var routesTripApplications = require("./api/routes/tripApplicationRoutes");

routesActors(app);
routesFinders(app);
routesSystemInformations(app);
routesSponsorship(app);
routesTrips(app);
routesTripApplications(app);

console.log("Connecting DB to: " + mongoDBURI);
mongoose.connection.on("open", function (err, conn) {
  app.listen(port, function () {
    console.log("ACME-EXPORER RESTful API server started on: " + port);
  });
});

mongoose.connection.on("error", function (err, conn) {
  console.error("DB init error " + err);
});

app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
