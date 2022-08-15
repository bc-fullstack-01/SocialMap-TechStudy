const express = require("express");
const swaggerUi = require('swagger-ui-express');
const createError = require("http-errors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const path = require('path')
const cors = require("cors")
const fs = require('fs')
 
// Files import
const { addPublishInReq } = require('./middlewares/rabbitMiddwares');
const Middles = require('./middlewares/securityMiddle');
const routers = require("./routers");

// Variables
const morganLogPath = fs.createWriteStream(path.join(__dirname, `Logs/access_${new Date().valueOf()}.log`), { flags: 'a' })
const bodyEncoded = bodyParser.urlencoded({ extended: true })

// instanciate express
const app = express();


// Middlewares
app.use(cors())
// app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(logger(process.env.DEV || "dev", { stream: morganLogPath }));
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) => (/^multipart\//i.test(req.get('Content-Type'))) ? next() : bodyEncoded(req, res, next))
app.use(bodyParser.json({ defer: true }));


// Routers
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require("./swagger.json"), { explorer: true }));
app.use(Middles.mongoConnection)

app.use("/v1/dev/seed", routers.Seed);
app.use("/v1/unsecurity", routers.Unsecurity)

app.use(addPublishInReq)

app.use("/v1/user", Middles.authenticateToken, routers.User)
app.use("/v1/profiles", Middles.authenticateToken, routers.Profile);
app.use("/v1/feed", Middles.authenticateToken, routers.Feed);
app.use("/v1/posts", Middles.authenticateToken, routers.Post, routers.Comment);


// Erro Middlewares
app.use((req, res, next) => next(createError(404)));
app.use(Middles.endPointError)

module.exports = app;