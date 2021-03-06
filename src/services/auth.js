const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const { SECRET_TOKEN } = require("../constants");

async function register({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await User.findOne({ username });

    if (existing) {
        throw new Error("Email is taken!");
    }

    const user = await User.create({ username, hashedPassword });
    return createToken(user);

}

async function login(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("Username or password is invalid!")
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
        throw new Error("Username or password is invalid!");

    }

    return createToken(user);

}

function createToken(user) {


    const payload = {
        _id: user._id,
        username: user.username,
        enrolledCourses: user.enrolledCourses
    }

    const token = jwt.sign(payload, SECRET_TOKEN);
    return token;
}

module.exports = {
    register,
    login
}