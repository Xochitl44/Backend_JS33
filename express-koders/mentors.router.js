const express = require("express");
const mentorsUseCase = require('./mentors.usecase');

const router = express.Router();

router.use((request, response, next) => {
    console.log("middleware a nivel de router (mentors)");
    next();
});

//methods for KODERS
// GET / -> Endpoint
//Endpoint = una combinacion de un metodo y una URL
router.get('/', (request, response, next) => {
    console.log("middleware a nivel de ruta (get mentors)");
    next();
    }, (request,response) => {
    try {
        const mentors = mentorsUseCase.getAll();

        response.json({
            message: 'All mentors',
            data: {
                mentors: mentors,
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
        const newMentor = request.body
        const mentors = mentorsUseCase.add(newMentor)

        response.json({
            message: 'Koder added',
            data: { mentors: mentors }
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
        const mentors = mentorsUseCase.deleteAll();
        response.json({
            message: 'All mentors deleted',
            data: { mentors: mentors }
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
        const mentors = mentorsUseCase.deleteByName(name);
        
        response.json({
            message: 'Mentor deleted',
            data: { mentors: mentors }
        });
    } catch {
        response.status(error.status || 500)

        response.json({
            error: error.message,
        });
    }
});
  
module.exports = router;




