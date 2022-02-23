const Course = require("../models/Course");

function create(course) {
    Course.create(course)
};

function getAll() {
    return Course.find().lean();
}

module.exports = {
    create,
    getAll
}