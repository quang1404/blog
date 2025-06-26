const Course = require("../models/Course");
const {
  mongooseToObject,
  multipleMongooseToObject,
} = require("../../util/mongoose");

class MeController {
  //[GET] /me/stored/courses
  storedCourses(req, res, next) {

    let courseQuery = Course.find({});

    Promise.all([
      courseQuery, // Use the query with sorting!
      Course.countDocumentsDeleted(),
    ])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  //[GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) => {
        // console.log(courses)
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
