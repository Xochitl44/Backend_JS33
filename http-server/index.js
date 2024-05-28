//imporatmos 
const http = require('node:http');

const server = http.createServer((request, response) => {
    const method = request.method;
    const url = request.url;
    response.end(`${method}: ${url}`);
});

server.listen(8080, () => {
console.log("server is listening on port 8080")
});

