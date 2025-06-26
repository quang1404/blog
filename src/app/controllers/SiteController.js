const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET] /news
    index(req, res, next) {
        Course.find({})
            .then(courses => 
                res.render('home', 
                    {courses: multipleMongooseToObject(courses)}))
            .catch(next);
    }
    
    //[GET] /news/:slug
    search(req, res) {
        res.render('search');
    }

    //[GET] /login
    login(req, res) {
        res.render('login');
    }

    //[GET] /register
    register(req, res) {
        res.render('register');
    }
}

module.exports = new SiteController();
