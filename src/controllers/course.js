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
            isPublic,
            creator: req.user._id
        }
        await courseService.create(course);
        res.redirect("/");
    } catch (err) {
        const errors = mapErrors(err);
        res.render("login", { errors });
    }

});

router.get("/details/:courseId", isUser, async (req, res) => {
    const course = await courseService.getOne(req.params.courseId);
    // const user = await courseService.getUserById(req.user._id);

    const isOwner = req.user && course.creator == req.user._id;
    const isEnrolled = req.user && course.usersEnrolled.some(x => x._id == req.user._id);
    console.log(isEnrolled)

    res.render("details", { ...course, isOwner, isEnrolled });
});

router.get("/enroll/:courseId", isUser, async (req, res) => {
    await courseService.enroll(req.user._id, req.params.courseId)
    res.redirect(`/details/${req.params.courseId}`)
});

router.get("/edit/:courseId", isUser, async (req, res) => {
    const course = await courseService.getOne(req.params.courseId);

    res.render("edit", { ...course })
});

router.post("/edit/:courseId", isUser, async (req, res) => {
    try {
        let isPublic = req.body.isPublic
        if (isPublic) {
            isPublic = true;
        }

        const course = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isPublic,
            creator: req.user._id
        }
        await courseService.updateById(req.params.courseId, course);
        res.redirect(`/details/${req.params.courseId}`);
    } catch (err) {
        const errors = mapErrors(err);
        res.render("login", { errors });
    }
});

router.get("/delete/:courseId", isUser, async (req, res) => {
    await courseService.deleteById(req.params.courseId);
    res.redirect('/')
});

router.get("/profile", isUser, async (req, res) => {
    const user = await courseService.getUserById(req.user._id);
    const enrolledCourses = user.enrolledCourses.map(x => x.title).join(", ");
    res.render("myProfile", { user, enrolledCourses })
})

module.exports = router;