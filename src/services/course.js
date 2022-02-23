const Course = require("../models/Course");

function create(course) {
    Course.create(course)
};


module.exports = {
    create
}