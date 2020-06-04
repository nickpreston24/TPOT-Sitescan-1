class Neo4jConnection {
    constructor() {
        // console.log('config :>> ', config);
        // if (!!url)
        //     Object.assign(this, config)
        // else {
        Object.assign(this,
            {
                url: "bolt://localhost",
                user: "neo4j",
                password: "root"
            })
        // }

        this.neo4j = require('neo4j-driver').v1;
        console.log('this.neo4j :>> ', this.neo4j);
        // console.log('credentials: ', this.url, this.user, this.password)
        this.driver = this.neo4j.driver(this.url, this.neo4j.auth.basic(this.user, this.password));
    }
}

module.exports = Neo4jConnection