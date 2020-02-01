const express = require('express');

const app = express();

const PORT = process.env.PORT || 9001;

app.get('/', (request, response) => {
    console.log(request.body);
    response.send(`Hello there!  Come here my friend, I won't hurt you.`)
})

let server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})