
const router = require("express").Router();

const teachingRoutes = require("./teachings");

router.use("/teachings", teachingRoutes);

module.exports = router;

// const router = require("express").Router();

// const teachingsRoutes = require("./teachings");
// console.log('teaching routes: ', !!teachingsRoutes);

// router.use("/teachings", teachingsRoutes);

// module.exports = router
