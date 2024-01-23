const fs = require('fs');
const http = require('http');
const url = require('url');

// -----This is the blocking, synchronous way
const input = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(input);

// `` is the Template string from ES6, we can use dynamic syntax to include js within a string.
// We can use string and + operator as well.
const output = `Some text I want to write to the file system: ${input} .\n created on: ${Date.now}`;
fs.writeFileSync('./txt/output.txt', output);

//This is the asynchronous, non-blocking way
//Note the triangular space indentation on the left, it is called callback hell.
//There is a way to make the process asynchoronous without using callback/causing callback hell.
//The outer most functions gets executed first, unlike the recursive function.
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    if(err) return console.log('Error!!!');
    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt','utf-8',(err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt',`${data2}.\n${data3}` ,'utf-8',(err, data4) => {
                console.log("File successfully written");
            })
        })
    });
});
console.log('Reading file...');
 
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const jsonObjData = JSON.parse(data); // parse a json object from string being read from a file

//http module
const server = http.createServer((req, res) => {
    // url module
    const resource = req.url;
    if(resource === '/overview' || resource === '/'){
        res.end('This is OVERVIEW endpoint');
    } else if (resource === '/product') {
        res.end('This is PRODUCT endpoint');
    } else if (resource === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'Custome-key': 'custom-value'
        });
        res.end("Resource not found!");
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000: ');
});
