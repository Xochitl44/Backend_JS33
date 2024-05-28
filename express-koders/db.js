const fs = require('node:fs');

const fileName = 'db.json';
const defaultData = {
    koders: []
}

//function para asegurar que exite el archivo
function init () {
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, JSON.stringify(defaultData));
    }
};

//function that all can be used to manipulate the DB
function read() {
    const dbAsAString = fs.readFileSync(fileName, "utf8");
    return JSON.parse(dbAsAString);
};

function write(dataToWrite) {
    fs.writeFileSync(fileName, JSON.stringify(dataToWrite));
}


module.exports = {
    //init: init,
    /*shorthand when the property and the value of that property are identical
    */
    init,
    read,
    write,
}