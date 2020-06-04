const dummy = { "hello": ", world" }

module.exports = function (neode) {

    console.log('neode instance: ', !!neode);

    const router = require("express").Router();

    const findAll = (req, res) => {
        const order_by = req.query.order || 'title';
        const sort = req.query.sort || 'ASC';
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const skip = (page - 1) * limit;

        const params = {};
        const order = { [order_by]: sort };
        console.log('parts:', params, order, limit, skip);

        console.log(!!neode.all)
        neode.all('Paper', params, order, limit, skip)
            .then(res => {
                /*
                 *`all` returns a NodeCollection - this has a toJson method that
                 * will convert all Nodes within the collection into a JSON object
                 */
                return res.toJson();
            })
            .then(json => {
                res.send(json);
            })
            .catch(e => {
                res.status(500).send(e.stack);
            });
    }

    const create = (request, response) => {
        response.json(dummy)
    }

    const find = (request, response) => {
        response.json(dummy)
    }

    const update = (request, response) => {
        response.json(dummy)
    }

    const remove = (request, response) => {
        response.json(dummy)
    }

    router.route("/api/papers")
        .get(findAll)
        .post(create);

    router.route("/api/papers/:id")
        .get(find)
        .put(update)
        .delete(remove);

    return router;
}