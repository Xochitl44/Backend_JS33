//la definicion de nuestro servidor e.g. sirve para exportar
//require se usa para importar 
const express = require("express");

const kodersUseCase = require("./koders.usecase");

const server = express();

server.use(express.json());

server.get('/', (request,response) => {
    response.json({
        message:"Kodemia APIv1"
    });
});

// GET /koders -> Endpoint
//Endpoint = una combinacion de un metodo y una URL
server.get('/koders', (request, response) => {
    //error handling e.g. try catch
    try {
        const koders = kodersUseCase.getAll();

        response.json({
            message: 'All koders',
            data: {
                koders: koders,
            }
        });
    } catch (error) {
        response.status(error.status || 500)

        response.json({
            error: error.message,
        });
    }
});

server.post('/koders', (request, response) => {
    try {
        const newKoder = request.body
        const koders = kodersUseCase.add(newKoder)

        response.json({
            message: 'Koder added',
            data: { koders }
        });
    } catch (error) {
        response.status(error.status || 500)

        response.json({
            error: error.message,
        });
    }
});

server.delete('/koders', (request, response) => {
    try {
        const koders = kodersUseCase.deleteAll();
        response.json({
            message: 'All koders deleted',
            data: { koders }
        });
    } catch {
        response.status(error.status || 500)

        response.json({
            error: error.message,
        });
    }
});

server.delete('/koders/:name', (request, response) => {
    try {
        const name = request.params.name;
        const koders = kodersUseCase.deleteByName(name);
        
        response.json({
            message: 'Koder deleted',
            data: { koders }
        });
    } catch {
        response.status(error.status || 500)

        response.json({
            error: error.message,
        });
    }
});

//como se exporta el servidor
module.exports = server;