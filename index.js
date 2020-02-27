const cool = require('cool-ascii-faces')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const axios = require('axios')

const neode = require('neode')
    .fromEnv()
    .withDirectory(path.join(__dirname, 'models'))

// console.log('instance: ', !!instance);
// instance.setEnterprise(true)

const PORT = process.env.PORT || 9001

const { books } = require('./books.json') || {}

const handleError = (res, reason, message, code) => {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "Error": message });
}

// var routes = require('./routes')
// console.log('routes: ', !!routes);
console.log('neode instance: ', !!neode);

// Harvest Haven 404 test:
// axios.get('https://www.harvesthaven.com/pages/organic-hemp-seeds')
//     .then(response => {
//         // console.log(response.data)
//         console.log("status", response.status)
//     })
//     .catch(error => {
//         if (error) {
//             console.error(error.message)
//             console.error(error.response.status)
//             // console.error(error.response.data)
//             // console.error(error.response.headers)
//         }
//     })

const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors())
    .use(require('./routes/api/papers')(neode))
    .get('/', (_, response) => response.send(200))
    .get('/hello', (_, response) => response.send(`Hello there!  Come here my friend, I won't hurt you.`))
    .get('/cool', (_, response) => response.send(cool()))
    .get('/api/books', (_, response) => response.send(books))
    .get("/api/books/:id", function (request, response) {
        let { id } = request.params
        console.log(`retreiving book ${id}`)
        return response.send(books[id])
    })
    .post('/api/checkout/update', function (request, response) {
        let paper = request.body
        console.log(request.body);
        return response.send(paper ? 200 : 500)
    })

app.listen(PORT, () => console.log(`listening on port ${PORT}`))