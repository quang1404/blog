const ip = require("ip");
const dotenv = require("dotenv");
const cors = require("cors");

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const SortMiddleware = require("./middleware/SortMiddleware");


const options = {
  definition: { 
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "A simple Express Blog API",
    },
    servers: [
      {
        url: `http://localhost:3000/`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const route = require("./routes");
const db = require("./config/db");

//connect to db
db.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

//custom middleware
app.use(SortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
