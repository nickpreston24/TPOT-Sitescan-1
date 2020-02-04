
const router = require("express").Router();

const teachingRoutes = require("./teaching");

router.use("/teachings", teachingRoutes);

module.exports = router;

// const router = require("express").Router();

// const teachingsRoutes = require("./teachings");
// console.log('teaching routes: ', !!teachingsRoutes);

// router.use("/teachings", teachingsRoutes);

// module.exports = router
