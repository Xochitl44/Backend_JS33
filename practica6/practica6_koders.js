//necesitamos declarar el script de fs
const fs = require("fs");

const KoderDataBase = "koderDB.json";

//create function to initialize the file

function init() {
    const fileExists = fs.existsSync(KoderDataBase);

    if (!fileExists) {
        fs.writeFileSync(KoderDataBase, JSON.stringify({ koderList: []}));
    }
}

//create function to read the list of saved koders
function listOfKoders () {
    const list = fs.readFileSync(KoderDataBase, "utf8");
    return JSON.parse(list).kodersList;
}

//create function to update and/or overwrite the existing object of koders
function updateKoders(koders) {
    const newKoders = { kodersList: koders };
    const newKodersAsString = JSON.stringify(newKoders);
    fs.writeFileSync(KoderDataBase, newKodersAsString);
  }
  
  //function to add name of new koder to existing list
  function add(koderName) {
    const koders = listOfKoders();
    koders.push(koderName);
    updateKoders(koders);
  }
  
  function remove(koderIndex) {
    const koders = listOfKoders();
    koders.splice(koderIndex, 1);
    updateKoders(koders);
  }
  
  function ls() {
    const allKoders = listOfKoders();
  
    if (!allKoders.length) {
      console.log("[EMPTY]");
      process.exit();
    }
  
    allKoders.forEach((element, index) => {
      console.log(index, "-", element);
    });
  }
  
  function reset() {
    updateKoders([]);
  }
  
  function main() {
    const command = process.argv[2];
    const arg = process.argv[3];
  
    init();
  
    if (command === "ls") {
      ls();
    } 
    
    else if (command === "add") {
      if (!arg) {
        console.error("Please enter a valid name of a koder");
        process.exit(1);
      }
  
      add(arg);
      ls();
      console.log("Koder added successfully");
    } 
    
    else if (command === "remove") {
      if (!arg) {
        console.error("missing koder name");
        process.exit(1);
      }
  
      const idx = parseInt(arg);
      if (isNaN(idx)) {
        console.error("Invalid index");
        process.exit(1);
      }
  
      const koders = listOfKoders();
  
      if (idx < 0 || idx >= koders.length) {
        console.error("Invalid index");
        process.exit(1);
      }
  
      remove(idx);
      ls();
      console.log("Koder vetted and removed!");
    } 
    
    else if (command === "reset") {
      reset();
      console.log("All the koders were successfully eliminated");
    } 
    
    else {
      console.error("Invalid command, please try again", command);
      process.exit(1);
    }
  }
  
  main();