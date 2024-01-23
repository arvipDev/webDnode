const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const resource = req.url;
    console.log(resource);
    if(resource === '/test' || resource === '/'){
        res.end('This is TEST endpoint');
    } else {
        res.end('This endpoint does not exist');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('module js being executed with http module');
});