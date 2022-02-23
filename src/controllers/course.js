const router = require("express").Router();
const courseService = require("../services/course");
const mapErrors = require("../utils/mapErrors");
const { isUser } = require("../middlewares/guards");

router.get("/create", isUser, (req, res) => {
    res.render("create");
});

router.post("/create", isUser, async (req, res) => {
    try {
        let isPublic = req.body.isPublic
        if (isPublic) {
            isPublic = true;
        }

        const course = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isPublic
        }
        await courseService.create(course);
        res.redirect("/");
    } catch (err) {
        const errors = mapErrors(err);
        res.render("login", { errors });
    }

});

module.exports = router;