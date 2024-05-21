//to-do add "limpiar mi cuarto"
//todo done [10]
//todo ls 
//todo alv

//necesitamos
//-un archivo para guardar los todos (.json)
//-una funcion para cada comando
//-usar process.argv para leer los comandos
//-usar fs para leer y escribir el archivo

//import fs 
const fs = require('fs');

//crear el archivo de base de datos 
const dbFile = 'db.json'

function init () {
    //check if the file exists
    const fileExists = fs.existsSync(dbFile);

    if (!fileExists) {
        fs.writeSync(dbFile, JSON.stringify({ todos: [] }));
    }
}


function getTodos() {
    // 1. Leer archivo
    const content = 
    fs.readFileSync(dbFile, "utf-8");
    return JSON.parse(content).todos;
}

function updateTodos () {
    const newTodos = { todos: todos }
    const newTodosAsString = JSON.stringify(newTodos);
    fs.writeFileSync(dbFile, newTodosAsString);
}

function add (task) {
    //leer archivo
    const todos = getTodos()
    todos.push(task)
    updateTodos(todos)
    //agregar al archivo
}

function done (taskIndex) {
    //leer archivo
    const todos = getTodos();
    todos.splice(taskIndex, 1)
    //actualizar el archivo
    updateTodos(todos)
}

function ls() {
    //leer archivo
    const todos = getTodos();
    
        if(!todos.length) {
            console.log("EMPTY");
            process.exit();
        }
        todos.forEach(task, idx => {
            console.log(idx, "--", task);    
        });
    }

function alv () {
    //actualizar el archivo
    updateTodos([]);
}

function main () {
    const command = process.argv[2]
    const arg = process.argv[3]
    
    init();

    if (command === 'ls') {
        ls()
    } else if (command === 'add') {
        if (!arg) {
            console.error("missing task")
            process.exit(1)
        }
        add(arg);
        ls();
        console.log("task added")
    } else if (command === 'done') {
        if (!arg) {
            console.error("missing task index")
            process.exit(1)
        }

        const idx = parseInt(arg);
        if(isNaN(idx)) {
            console.error("invalid index")
            process.exit(1)
        }

        const todos = getTodos();

        if (idx < 0 || idx >= todos.length) {
            console.error("invalid index")
            process.exit(1)
        }

        done(idx);
        ls();
        console.log("task completed!");
    }
}