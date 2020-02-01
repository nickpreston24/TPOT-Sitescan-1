const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 9001

const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (request, response) => response.render('pages/index'))
    .get('/cool', (request, response) => response.send(cool()))
    .listen(PORT, () => console.log(`listening on port ${PORT}`))

// app.get('/', (request, response) => {
//     console.log(request.body);
//     response.send(`Hello there!  Come here my friend, I won't hurt you.`)
// })

// let server = app.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`)
// })