const cool = require('cool-ascii-faces')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const PORT = process.env.PORT || 9001

const books = require('./books.json') || {}

const handleError = (res, reason, message, code) => {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors())
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .get('/', (_, response) => response.render('pages/index'))
    .get('/hello', (_, response) => response.send(`Hello there!  Come here my friend, I won't hurt you.`))
    .get('/cool', (_, response) => response.send(cool()))
    .get('/api/books', (_, response) => response.send(books))
    .get("/api/books/:id", function (request, response) {
        let { id } = request.params
        console.log(`retreiving book ${id}`)
        return response.send(books[id]);
    })

    .listen(PORT, () => console.log(`listening on port ${PORT}`))