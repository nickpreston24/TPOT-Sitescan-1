const dummy = { "hello": ", world" }

module.exports = {
    findAll: function (request, response) {
        response.json(dummy)
    },
    find: function (request, response) {
        response(dummy)
    },
    create: function (request, response) {
        response(dummy)
    },
    update: function (request, response) {
        response(dummy)
    },
    remove: function (request, response) {
        response(dummy)
    }
};