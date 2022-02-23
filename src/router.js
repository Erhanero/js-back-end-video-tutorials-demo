const router = require("express").Router();
const homeController = require("./controllers/home");
const registerController = require("./controllers/register");
const loginController = require("./controllers/login");
const courseController = require("./controllers/course");

router.use(homeController);
router.use(registerController);
router.use(loginController);
router.use(courseController)
module.exports = router;
