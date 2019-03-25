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
    DataWareHouseTools = require("./api/controllers/dataWarehouseController"),
    bodyParser = require("body-parser"),
    swaggerJSDoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express"),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    firebaseAdmin = require('firebase-admin'),
    serviceAccount = require('./saas-6d6bd-firebase-adminsdk-yxbis-4bae6940cd'),
    app = express();

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('server.crt')
}

// swagger definition
var swaggerDefinition = {
    info: {
        title: "Acme Explorer API",
        version: "2.0.0",
        description: "This is the Acme Explorer API documentation"
    },
    host: "https://localhost:" + port,
    basePath: ""
};



var optionsSwagger = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ["./api/**/*.js"],
    basePath: " / " //  Base de ruta (opcional)
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(optionsSwagger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB URI building
var mongoDBUser = process.env.mongoDBUser || "adminUser";
var mongoDBPass = process.env.mongoDBPass || "password";
var mongoDBCredentials =
    mongoDBUser && mongoDBPass ? mongoDBUser + ":" + mongoDBPass + "@" : "";

var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.mongoDBPort || "27017";
var mongoDBName = process.env.mongoDBName || "ACME-EXPLORER";
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
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://saas-6d6bd.firebaseio.com"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routesActorsv1 = require("./api/routes/actorRoutes");
var routesFindersv1 = require("./api/routes/finderRoutes");
var routesSystemInformationsv1 = require("./api/routes/systemInformationRoutes");
var routesSponsorshipv1 = require("./api/routes/sponsorshipRoutes");
var routesTripsv1 = require("./api/routes/tripRoutes");
var routesTripApplicationsv1 = require("./api/routes/tripApplicationRoutes");
var routesTripStagesv1 = require("./api/routes/tripStageRoutes");


routesActorsv1(app);
routesFindersv1(app);
routesSystemInformationsv1(app);
routesSponsorshipv1(app);
routesTripsv1(app);
routesTripApplicationsv1(app);
routesTripStagesv1(app);


console.log("Connecting DB to: " + mongoDBURI);
mongoose.connection.on("open", function(err, conn) {
    app.listen(8000, function() {
        console.log("ACME-EXPORER RESTful API server started on: " + port);
    });
    https.createServer(options, app).listen(port);
});


mongoose.connection.on("error", function(err, conn) {
    console.error("DB init error " + err);
});

app.get("/swagger.json", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});