require('dotenv').config()
const PORT = process.env.PORT || 8080;
var express = require('express')
var app = express()

// app.use(require('./api.js'), () => { });

const api = require('./api')


// let papers = [];

app.get('/', (request, response, next) => {
    response.send({})
})

// // Get only by ID
// app.get('/paper/:id', function (req, res) {
//     res.send({ slug: 'what-the-lord-has-done-with-me-part0' })
// })

// Get by slug name:
app.get('/paper/:slug', async (req, res) => {
    console.log('req.params :>> ', req.params);
    const { slug } = req.params;
    let papers = await api.getPaper(slug);
    // console.log('papers :>> ', papers);
    res.send(papers)
})

// app.put('paper', (req, res)=>{
//     papers.push({ slug: `New Paper ${papers.length+1}`})
//     console.log('papers :>> ', papers);
//     res.send(200)
// })



app.listen(PORT, () => console.log(`🌎  ==> API server now on localhost:${PORT}!`))