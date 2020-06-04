module.exports = {
    "name": "string",
    "email": "string", //arbitrary

    //Could also do 'published'    
    created: {
        type: "relationship",
        target: "Paper",
        relationship: "created",
        direction: "out",
        properties: {
            //leaving this empty, as I don't want props on relationships
        }
    }
}