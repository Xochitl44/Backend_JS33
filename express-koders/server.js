//la definicion de nuestro servidor e.g. sirve para exportar
//require se usa para importar 
const express = require("express");

//importando nuestro router de koders
const kodersRouter = require("./koders.router")
const mentorsRouter = require("./mentors.router")

/*
const kodersUseCase = require("./koders.usecase");
const mentorsUseCase = require("./mentors.usecase");
*/
const server = express();

//middleware
server.use(express.json());

//2nd middleware
server.use((request, response, next) => {
    console.log("Middleware de application")

    const authorization = request.headers.authorization;

    if (authorization === 'kodemia') {
        next();
        } else {
            response.status(403);
            response.json({
                message: "No tienes acceso"
            });
        }
    });

//montar el router en el server
server.use("/koders", kodersRouter);
server.use("/mentors", mentorsRouter);

server.get('/', (request,response) => {
    response.json({
        message:"Kodemia APIv1"
    });
});

//como se exporta el servidor
module.exports = server;


//single responsibility principal
//funciones tengan una sola responsibilidad