var express = require("express"),
    port = process.env.PORT || 8080,
    mongoose = require("mongoose"),
    Actor = require("./api/models/actorModel"),
    Sponsorship = require("./api/models/sponsorshipModel"),
    Trip = require("./api/models/tripModel"),
    TripApplication = require("./api/models/tripApplicationModel"),
    SystemInformation = require("./api/models/systemInformationModel"),
    Finder = require("./api/models/finderModel"),
    DataWareHouse = require("./api/models/dataWareHouseModel"),
    DataWareHouseTools = require("./api/v2/controllers/dataWarehouseController"),
    bodyParser = require("body-parser"),
    swaggerJSDoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express"),
    fs = require('fs'),
    https = require('https'),
    admin = require('firebase-admin'),
    serviceAccount = require('./hipernube-firebase-adminsdk-fuk61-4a298e43b6.json'),
    app = express();

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}

// swagger definition
var swaggerDefinitionv1 = {
    info: {
        title: "Acme Explorer API",
        version: "1.0.0",
        description: "This is the Acme Explorer API documentation"
    },
    host: "localhost:" + port,
    basePath: ""
};

var swaggerDefinitionv2 = {
    info: {
        title: "Acme Explorer API",
        version: "2.0.0",
        description: "This is the Acme Explorer API documentation"
    },
    host: "localhost:" + port,
    basePath: ""
};

// options for the swagger docs
var optionsv1 = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinitionv1,
    // path to the API docs
    apis: ["./api/v1/**/*.js"],
    basePath: " / " //  Base de ruta (opcional)
};

// initialize swagger-jsdoc
var swaggerSpecv1 = swaggerJSDoc(optionsv1);
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecv1));

var optionsv2 = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinitionv2,
    // path to the API docs
    apis: ["./api/v2/**/*.js"],
    basePath: " / " //  Base de ruta (opcional)
};

// initialize swagger-jsdoc
var swaggerSpecv2 = swaggerJSDoc(optionsv2);
app.use("/v2/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecv2));

// MongoDB URI building
var mongoDBUser = process.env.mongoDBUser || "adminUser";
var mongoDBPass = process.env.mongoDBPass || "password";
var mongoDBCredentials =
    mongoDBUser && mongoDBPass ? mongoDBUser + ":" + mongoDBPass + "@" : "";

var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.mongoDBPort || "27017";
var mongoDBName = process.env.mongoDBName || "ACME-Explorer";
var mongoDBURI =
    "mongodb://" +
    mongoDBCredentials +
    mongoDBHostname +
    ":" +
    mongoDBPort +
    "/" +
    mongoDBName;

mongoose.connect(mongoDBURI, {
    reconnectTries: 10,
    reconnectInterval: 500,
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true
    /* , autoIndex: false */
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routesActorsv1 = require("./api/v1/routes/actorRoutes");
var routesFindersv1 = require("./api/v1/routes/finderRoutes");
var routesSystemInformationsv1 = require("./api/v1/routes/systemInformationRoutes");
var routesSponsorshipv1 = require("./api/v1/routes/sponsorshipRoutes");
var routesTripsv1 = require("./api/v1/routes/tripRoutes");
var routesTripApplicationsv1 = require("./api/v1/routes/tripApplicationRoutes");


routesActorsv1(app);
routesFindersv1(app);
routesSystemInformationsv1(app);
routesSponsorshipv1(app);
routesTripsv1(app);
routesTripApplicationsv1(app);

var routesActorsv2 = require("./api/v2/routes/actorRoutes");
var routesFindersv2 = require("./api/v2/routes/finderRoutes");
var routesSystemInformationsv2 = require("./api/v2/routes/systemInformationRoutes");
var routesSponsorshipv2 = require("./api/v2/routes/sponsorshipRoutes");
var routesTripsv2 = require("./api/v2/routes/tripRoutes");
var routesTripApplicationsv2 = require("./api/v2/routes/tripApplicationRoutes");
var routesLoginv2 = require("./api/v2/routes/loginRoutes");
var routesDataWareHousev2 = require("./api/v2/routes/dataWarehouseRoutes");

routesActorsv2(app);
routesFindersv2(app);
routesSystemInformationsv2(app);
routesSponsorshipv2(app);
routesTripsv2(app);
routesTripApplicationsv2(app);
routesLoginv2(app);
routesDataWareHousev2(app);

console.log("Connecting DB to: " + mongoDBURI);
mongoose.connection.on("open", function (err, conn) {
    app.listen(8000, function () {
        console.log("ACME-EXPORER RESTful API server started on: " + port);
    });
    https.createServer(options, app).listen(port);
});


mongoose.connection.on("error", function (err, conn) {
    console.error("DB init error " + err);
});

app.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});