const ip = require('ip');
const dotenv = require('dotenv');
const cors = require('cors');

const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');

const path = require('path');
const app = express();
const port = process.env.PORT || 3001; // Change 3000 to 3001 or another free port

const route = require('./routes');

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
