const express = require("express");
const kodersUseCase = require("./koders.usecase");

//esto cree un nuevo router de express
//Router debe de tener la R en mayuscula
const router = express.Router();

router.use((request, response, next) => {
    console.log("middleware a nivel de router (koders)");
    next();
});

//methods for KODERS
// GET / -> Endpoint
//Endpoint = una combinacion de un metodo y una URL
router.get('/', (request, response, next) => {
    console.log("middleware a nivel de ruta (get koders)");
    next();
    }, (request,response) => {
    try {
        const koders = kodersUseCase.getAll();

        response.json({
            message: 'All koders',
            data: {
                koders: koders,
            },
        });
    } catch (error) {
        response.status(error.status || 500)

        response.json({
            error: error.message,
        });
    }
}); 

router.post('/', (request, response) => {
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

router.delete('/', (request, response) => {
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

router.delete('/:name', (request, response) => {
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

//exportar el router
module.exports = router;