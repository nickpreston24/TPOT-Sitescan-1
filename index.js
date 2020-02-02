const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 9001

const books = require('./books.json') || {}


const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .get('/', (_, response) => response.render('pages/index'))
    .get('/hello', (_, response) => response.send(`Hello there!  Come here my friend, I won't hurt you.`))
    .get('/cool', (_, response) => response.send(cool()))
    .get('/api/books', (_, response) => response.send(books))
    .listen(PORT, () => console.log(`listening on port ${PORT}`))

// app.get('/', (request, response) => {
//     console.log(request.body);
//     response.send()
// })

// let server = app.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`)
// })