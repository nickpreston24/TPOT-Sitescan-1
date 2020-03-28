// This is a POC for both filtering out existing scripture translations and re-assembling them into a 'bible', according to how TPOT uses them.
// The idea comes from the Theo-Auto pt.11 particle, CHAI: https://www.thepathoftruth.com/what-the-lord-has-done-with-me/part11/p10.htm)

const fs = require('fs')

const parseScriptures = (text) => {

    let pattern = "\d+";

}
console.log('running...')
// console.log('dir:', fs.readdir('israel-god-unjust.txt'), null, ()=>{})
// let filePath = 
 
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var path = process.argv[2];
 
// List all files in dir
fs.readdir(path, function(err, items) {
    if(!items || items.length === 0)
        return;

    for (var i=0; i<items.length; i++) {

        var filename = path + '/' + items[i];
 
        fs.stat(filename, function(err, stats) {
            console.log(filename, ' - size: ' + stats["size"]);
        });
    }
});
