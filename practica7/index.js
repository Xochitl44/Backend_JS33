//importando express con require guardado en una const
const express = require('express');

//mandar a llamar la funcion express
const server = express();

//indica al servidor que va a recibir en JSON
//server.use se tiene que declarar al principio
server.use(express.json());

//arreglo vacio para inyectar las propiedades creadas por el usuario
const koders = [];

//listar todos los koders [GET/koders]
server.get('/koders', (request, response) => {
    response.json({
        message: 'A list of all the koders',
        koders: koders,
    })
})

//registar un nuevo koder [POST/koders]
server.post('/koders', (request, response) => {
    const newKoder = request.body.koder;
    if (!newKoder) {
        response.status(400);
        response.json({
            message:'a koder is required'
        });

        return;
    }

    const newFull
    Koder = request.body
    const nameKoder = request.body.name;
    const generationKoder = request.body.generation;
    const genderKoder = request.body.gender;
    const ageKoder = request.body.generation;
    const isActiveKoder = request.body.active;

    koders.push(nameKoder, generationKoder, genderKoder, ageKoder, isActiveKoder);
    response.json({
        message: 'A new koder was added',
        koders: koders
    })
})

//Eliminar koders por nomber [DELETE/koders/:name]
server.delete('/koders/:name', (request, response) => {
    if(!koders.name) {
        response.status(400);
        response.json({
            message:'invalid koder, please try a name of a koder that has already been registered'
        })

        return;
    }

})

//Eliminar todos los koders [DELETE/koders]
server.delete('/koders', (request, response) => {
    const deleteKoders = []
    response.json({
        message: 'all koders were deleted successfully',
        koders: deleteKoders
    });
});

server.listen(8080, () => {
    console.log('server running on port 8080')
})