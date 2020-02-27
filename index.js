const cool = require('cool-ascii-faces')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const axios = require('axios')
const cheerio = require('cheerio')
const { getRandomInt, getRandomArbitrary } = require('./math')

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
// console.log(getRandomInt(1, 10), getRandomArbitrary(1, 10));

const pcPartPickerUrls = [
    'https://pcpartpicker.com/b/76vnTW',
    'https://pcpartpicker.com/b/Tj8Ycf',
    'https://pcpartpicker.com/b/76vnTW',
    'https://pcpartpicker.com/b/gZnH99',
    'https://pcpartpicker.com/b/HpdXsY',
    'https://pcpartpicker.com/b/h2q48d',
    'https://pcpartpicker.com/b/vs6scf',
    'https://pcpartpicker.com/b/JBQZxr',
    'https://pcpartpicker.com/b/jqYTwP',
    'https://pcpartpicker.com/b/bVtgXL',
    'https://pcpartpicker.com/b/rwMZxr',
    'https://pcpartpicker.com/b/xVtgXL',
    'https://pcpartpicker.com/b/8xhypg',
]

index = getRandomInt(0, pcPartPickerUrls.length - 1);
let selectedUrl = pcPartPickerUrls[index]

console.log('chosen url', selectedUrl);

function crawl(url, depth = 3, nodeId) {
    // 1. Get Node by Id from Neo4j or create if new Url

    // 2. Mark the Node as 'Visited'

    // 3. If the node has links, query them all
    //      If no links, run a scan()
    scan(url, depth, {});
}

/**
 * @param {The URL} url 
 * @param {The current shape of relevant html for a given site} shapeMap 
 */
async function scan(url, depth, shapeMap) {

    if (depth <= 0) {
        return;
    }
    if (!url) {
        console.log('URL cannot be empty!');
        return
    }

    var ping = await axios.get(url)
        .then(response => {
            // console.log('resp', response);
            return { code: response.status, data: response.data }
        })
        .catch(error => {
            console.log('err', error);
            return {
                code: error.response.status, message: error.message, data: error.response.data
            }
        })

    const { status, data } = ping;
    console.log('url has data? ', !!data);
    // console.log('data', data);

    switch (status) {
        case 404:
            // TODO: store as 'Unreachable'
            console.log(`Failed to connect at '${url}'!`);
            return;
        case 200:
        default:
            console.log('Success!');
        // store as 'Visited' (and last visit date)
        // Find its children
    }

    // 1. Use cheerio to extract out links (a hrefs)
    let links = getLinks(data)
    console.log('links found: ', links);

    // 2. Call Neo4j to see which of those links have NOT been visited
    // 2.1 Update the links [] with correct visited state

    //3.1 Recurse the set of urls
    console.log(`Depth:`, depth, `Parent Url: `, url);
    links.forEach(l => scan(l.url, depth - 1));

}

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

crawl(selectedUrl, 2);

function getLinks(html) {
    const $ = cheerio.load(html)
    let links = []
    let mainSiteUrl = 'https://pcpartpicker.com'
    $('table.partlist.partlist--mini > tbody > tr > td.td__name > a')
        .each((index, value) => {
            console.log(index);
            var url = mainSiteUrl + $(value).attr('href')
            var name = $(value).text()
            if (name && url)
                // 3. Add Unvisited Links to the current queue
                links.push({ name, url, visited: false })
        })
    return links
}

