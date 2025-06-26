const newsRouter = require('./news');
const meRoute = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRoute);
    app.use('/courses', coursesRouter);

    app.use('/', siteRouter);

}

module.exports = route;
