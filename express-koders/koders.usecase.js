const db = require("./db");


function add (newKoder) {
    /*longhand kode with if's however it can be cutdown to one line of code
    if(!newKoder.name {
        throw new Error('Name is re quired');    
    })
    */
   
    //code to validate name
    if(!newKoder.name) throw new Error("Name is required"); 
    
    //code to validate generation and if its a #
    if(!newKoder.generation) throw new Error("Generation is required");
    newKoder.generation = parseInt(newKoder.generation);
    if(isNaN(newKoder.generation)) throw new Error("Generation must be a number");  
    if (newKoder.generation <= 0) throw new Error("Generation must be greater than 0");


    /*example of one way to set validations for gender 
    if(newKoder.gender.toLowerCase() !== "male" && newKoder.gender.toLowerCase() !== "female") throw new Error('only male and female are accepted');  
    */
    //another way to shorten and clean code with the same validations

    //code to validate gender
    if(!newKoder.gender) throw new Error ('Gender is required');
    if (!['m', 'f', 'nb'].includes(newKoder.gender.toLowerCase())) {
        throw new Error('only m and f are accepted');
    }

    //code to validate age    
    if(!newKoder.age) throw new Error('Age is required');
    newKoder.age = parseInt(newKoder.age);
    if(isNaN(newKoder.age)) throw new Error('Age must be a number');  
    if(newKoder.age <= 0) throw new Error("Age must be greater than 0");
    
    //code to validate is koder is active
    if(typeof newKoder.isActive !== 'boolean') {
        throw new Error ('isActive must be a boolean');
    }

    //esto nos regresa la base de datos completa
    const dbData = db.read()

    //agregar nuevo koder al arreglo
    dbData.koders.push(newKoder)

    db.write(dbData);

    return dbData.koders;

}

function deleteAll () {
    //mandar a llamar a los koders de la base de datos
    const dbData = db.read();

    dbData.koders = [];

    db.write(dbData);

    return dbData.koders;
}

function deleteByName (name) {
    if (!name) throw new Error('Name is required');

    const dbData = db.read();

    /*one way to code it
    const newKoders = dbData.koders.filter( (koder) => koder.name !== name);

    dbData.koder = newKoders;
    */

    dbData.koders = dbData.koders.filter((koder) => koder.name !== name);

    db.write(dbData);

    return dbData.koders;
}

function getAll () {
    /*longway to code it
    const dbData = db.read();

    return dbData.koders;
    */

    return db.read().koders;
    
}

//exportar modules e.g. functions creation above

module.exports = {
    add,
    deleteAll,
    deleteByName,
    getAll,
};