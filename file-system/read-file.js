const fs = require('fs');

const content = fs.readFileSync('hola.txt','utf-8');

console.log(content);