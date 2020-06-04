const neo4j = require('neo4j-driver');
const driver = new neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "tpot"));

//Models:
const Paper = require('./shared/models/Paper')

// Converters:
function asPapers(records) {
    // console.log('response.records :>> ', records);
    console.log('records[0] :>> ', records[0].get('paper'));
    return records.map(record => new Paper(record.get('paper').properties));
}


// TODO: Learn how to properly query using the params
function searchPapers(query = null) {
    console.log('searching...')
    if (!query) {
        console.warn('No slug passed');
        return [];
    }

    const session = driver.session()
    session
        .run(
            `MATCH (paper:Paper) \
            WHERE paper.slug =~ $slug \
            return paper`
            ,
            { slug: '(?i).*' + query + '.*' }
        )
        .then(result => {
            session.close();
            console.log('result :>> ', result);
            return asPapers(result.records)
        })
        .catch(error => {
            console.log('error :>> ', error);
            session.close();
            throw error;
        });
}


function getPaper(slug = null, title = null) {
    console.log('searching...')
    if (!slug) {
        console.warn('No slug passed');
        return [];
    }

    const session = driver.session()
    return session
        .run(`match (paper:Paper) return paper`)
        .then(response => {
            return asPapers(response.records)
        })
        .catch(error => {
            console.log('error :>> ', error);
            session.close();
            throw error;
        });
}

exports.searchPapers = searchPapers;
exports.getPaper = getPaper;