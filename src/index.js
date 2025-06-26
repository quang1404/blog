const ip = require("ip");
const dotenv = require("dotenv");
const cors = require("cors");

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");

const SortMiddleware = require("./app/middleware/SortMiddleware");

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
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {

        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "bi bi-chevron-expand",
          asc: "bi bi-sort-down-alt",
          desc: "bi bi-sort-down",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        }

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}" class="sort-btn">
                        <span class="${icon}"></span>
                </a> `;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
