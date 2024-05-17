const fs = require('fs');

/*funcion de fs para crear carpetas de forma sincrona
fs.mkdirSync('./newDirectory')
*/

//how to create a new directory while using a condition to see if it already exists
const newDirectory = './new-directory-created';

// Check if the directory exists
if (!fs.existsSync(newDirectory)) {
    // If it doesn't exist, create the directory
    fs.mkdirSync(newDirectory);
  
    console.log(`Directory '${newDirectory}' created.`);
  } else {
    console.log(`Directory '${newDirectory}' already exists.`);
  }
  