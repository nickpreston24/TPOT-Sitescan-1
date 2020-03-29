// This is a POC for both filtering out existing scripture translations and re-assembling them into a 'bible', according to how TPOT uses them.
// The idea comes from the Theo-Auto pt.11 particle, CHAI: https://www.thepathoftruth.com/what-the-lord-has-done-with-me/part11/p10.htm)

const fs = require('fs')
const { getAllFiles, readFileAsync } = require('./fs-extras')
const AsyncObject = require('@cuties/cutie').AsyncObject

const parseScriptures = (text, pattern) => {
    const matches = text.match(pattern) || [];
    console.log('m: ', matches, 'len', matches.length)
    // console.log(text.filter(line=> ))
    return matches
}

class ReadDataByPath extends AsyncObject {

    constructor(path, encoding) { super(path, encoding); }

    asyncCall = () => fs.readFile
}

const patterns = {
    "prefix": /(?<Scripture>[a-zA-Z]+\s+\d{1,3}:?\d{1,2}-?\d{1,2}\s+[A-Z]+\r*\n)(?<Text>.*?)(?:\r*\n){2}/gsm,
    "postfix": /^(?<Text>.*?)(?<Scripture>\(\w+\s+\d{1,3}:?\d{1,2}-?\d{1,2}\s+[A-Z]{2,4}\)\.?)/gm
}

class WrittenFile extends AsyncObject {

    constructor(path, content) { super(path,content) }

    asyncCall(){
        return (path, content, callback) => {
            this.path = path     

            // sample: “Every way of a man is right in his own eyes, but the LORD weighs the hearts” (Proverbs 21:2 HNV).            

            let prefixScripture = /(?<Scripture>[a-zA-Z]+\s+\d{1,3}:?\d{1,2}-?\d{1,2}\s+[A-Z]+\r*\n)(?<Text>.*?)(?:\r*\n){2}/gsm;
            let postFixScripture = /^(?<Text>.*?)(?<Scripture>\(\w+\s+\d{1,3}:?\d{1,2}-?\d{1,2}\s+[A-Z]{2,4}\)\.?)/gm;         
           
            const prefixed = parseScriptures(content, prefixScripture);
            const postfixed = parseScriptures(content, postFixScripture);

            const delimiter = '\n\n';

            let result = [ prefixed, postfixed].flat().map(r=>r.trim()).join(delimiter)
            console.log('resulting text: ', result, '\ntotal', result.split(delimiter).length, 'pre:', prefixed.length, 'post:', postfixed.length)

            {/* let remaining = result.replace(prefixed, '').replace(postfixed, '') */}
            {/* console.log('remaining bits:', remaining ) */}
    
            fs.writeFile(path, result, callback)
        }
    } 

    onResult(){
        return this.path
    }

    onError(error){
        console.log('ya done goofed!', error)
    }
}

function main () {

    if (process.argv.length <= 2) {
        console.log("Usage: " + __filename + " path/to/directory");
        process.exit(-1);
    } 

    var path = process.argv[2];

    var files = getAllFiles(path).files.filter(n=>n.includes('.txt'));

    console.log('Matching files: ', files);

    new WrittenFile('./output.txt',
        new ReadDataByPath(files[0], 'utf8')
    )
    .call()    
}

main()