const db = require("./db");


function add (newMentor) {
    /*longhand kode with if's however it can be cutdown to one line of code
    if(!newMentor.name {
        throw new Error('Name is re quired');    
    })
    */
   
    //code to validate name
    if(!newMentor.name) throw new Error("Name is required"); 
    
    //code to validate generation and if its a #
    if(!newMentor.generation) throw new Error("Generation is required");
    newMentor.generation = parseInt(newMentor.generation);
    if(isNaN(newMentor.generation)) throw new Error("Generation must be a number");  
    if (newMentor.generation <= 0) throw new Error("Generation must be greater than 0");


    /*example of one way to set validations for gender 
    if(newMentor.gender.toLowerCase() !== "male" && newMentor.gender.toLowerCase() !== "female") throw new Error('only male and female are accepted');  
    */
    //another way to shorten and clean code with the same validations

    //code to validate gender
    if(!newMentor.gender) throw new Error ('Gender is required');
    if (!['m', 'f', 'nb'].includes(newMentor.gender.toLowerCase())) {
        throw new Error('only m and f are accepted');
    }

    //code to validate age    
    if(!newMentor.age) throw new Error('Age is required');
    newMentor.age = parseInt(newMentor.age);
    if(isNaN(newMentor.age)) throw new Error('Age must be a number');  
    if(newMentor.age <= 0) throw new Error("Age must be greater than 0");
    
    //code to validate is mentor is active
    if(typeof newMentor.isActive !== 'boolean') {
        throw new Error ('isActive must be a boolean');
    }

    //esto nos regresa la base de datos completa
    const dbData = db.read()

    //condition so that when you use method POST, it knows that what is being entered is NOT a koder
    while (!dbData.mentors) {
        dbData.mentors = []
    }

    //agregar nuevo mentor al arreglo
    dbData.mentors.push(newMentor)

    db.write(dbData);

    return dbData.mentors;

}

function deleteAll () {
    //mandar a llamar a los mentors de la base de datos
    const dbData = db.read();

    dbData.mentors = [];

    db.write(dbData);

    return dbData.mentors;
}

function deleteByName (name) {
    if (!name) throw new Error('Name is required');

    const dbData = db.read();

    /*one way to code it
    const newMentors = dbData.mentors.filter( (mentor) => mentor.name !== name);

    dbData.mentor = newMentors;
    */

    dbData.mentors = dbData.mentors.filter((mentor) => mentor.name !== name);

    db.write(dbData);

    return dbData.mentors;
}

function getAll () {
    /*longway to code it
    const dbData = db.read();

    return dbData.mentors;
    */

    return db.read().mentors;
    
}

//exportar modules e.g. functions creation above

module.exports = {
    add,
    deleteAll,
    deleteByName,
    getAll,
};