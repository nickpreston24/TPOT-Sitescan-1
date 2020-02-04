const router = require("express").Router();
const teachings = require("../../../controllers/teachings");

// Matches with "/api/teachings"
router.route("/")
    .get(teachings.findAll)
    .post(teachings.create);

// Matches with "/api/teachings/:id"
router.route("/:id")
    .get(teachings.find)
    .put(teachings.update)
    .delete(teachings.remove);

// Matches "/api/teachings/teaching/:id"
router.route("/teaching/:id")
    .get(teachings.find);

module.exports = router;

// const router = require('express').Router()
// const teachings = require('../../../controllers/teachings')

// router.route("/")
//     .get(teachings.findAll)
//     .post(teachings.create)

// router.route('/:id')
//     .get(teachings.findById)
//     .put(teachings.update)
//     .delete(teachings.remove)

// console.log('routes: ', !!router);
// module.exports = router