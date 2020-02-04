const router = require("express").Router();
const apiRoutes = require('./api/teachings');

// API Routes
router.use("/api", apiRoutes);

module.exports = router;

// const router = require('express').Router()
// const teachingsRoutes = require("./api/teachings/teachings");

// console.log('teaching routes: ', !!teachingsRoutes);
// router.use("/teachings", teachingsRoutes);

// router.use((request, response) => {
//     response.send('default route hit \u2639 ')
// })

// module.exports = router;