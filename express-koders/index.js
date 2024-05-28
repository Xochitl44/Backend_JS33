//importando el modulo server

//iniciar el servidor
const server = require("./server")

//inicializar la base de datos
const db = require("./db");
const port = 8080;

db.init();

//poner a escuchar el servidor
server.listen(port, () => {
    console.log(`Server is running at http://localhost: ${port}`)
})