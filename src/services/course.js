const Course = require("../models/Course");
const User = require("../models/User");

function create(course) {
    Course.create(course)
};

function getAll() {
    return Course.find().lean();
}

function getOne(id) {
    return Course.findById(id).populate("usersEnrolled").lean();
}


async function enroll(userId, courseId) {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    user.enrolledCourses.push(course._id);
    course.usersEnrolled.push(user._id);

    await user.save();
    await course.save();
}

function getUserById(id) {
    return User.findById(id).populate("enrolledCourses").lean();
}

function updateById(id, course) {
    return Course.findByIdAndUpdate(id, course)
}

function deleteById(id) {
    return Course.findByIdAndDelete(id);

}
module.exports = {
    create,
    getAll,
    getOne,
    enroll,
    getUserById,
    updateById,
    deleteById
}