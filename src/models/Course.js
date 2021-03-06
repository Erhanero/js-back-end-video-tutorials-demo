const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false,

    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    usersEnrolled: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"

        }
    ],
}, {
    timestamps: true
});


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;