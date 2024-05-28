const express = require('express');

const server = express();

const koders = [{
    name: 'Xochitl',
    generation: '33',
    },
    {
    name: 'Eduardo',
    generation: '33',
    },
    {
    name: 'Susana',
    generation: '33',
    },
]

//habilita nuestro server para poder recibir peticiones en formato JSON
server.use(express.json());

server.get('/', (request, response) => {
    console.log('GET root');
    //response.end('Hola desde root GET')
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    response.end('Hola Mundo')

});

server.get('/koders', (request,response) => {
  /*  response.writeHead(200, {
        'Content-Type': 'application/JSON',
    });
    response.end(JSON.stringify(koders))
*/
    response.status(500);
    response.json(koders);
});

server.post('/koders', (request, response) => {
    //console.log('POST koders');
    //response.end('POST koders');

    console.log('body: ', request.body);
    const newKoderName = request.body.name;
    const newKoderGeneration = request.body.generation;

    const newKoder = {
        name: newKoderName,
        generation: newKoderGeneration
    }

    koders.push(newKoder);

    response.json(koders)
})

server.listen(8080, () => {
    console.log('Server ready!');
})