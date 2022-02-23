const router = require("express").Router();
const { getAll } = require("../services/course");

router.get("/", async (req, res) => {
    const courses = await getAll();
    res.render("home", { courses });
});

module.exports = router;