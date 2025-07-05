const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const { PORT } = process.env

const server = express()

server.use(morgan('dev'))
server.use(express.json())
server.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Credentials", "true");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
   );
   res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
   );
   next();
});

let tasks = [
   {
      id: 1,
      title: "tarea 1",
      description: "description de la tarea 1",
      completed: false,
      createdAt: new Date().toISOString()
   },
   
];

server.get('/api/tasks',(req, res) => {
   if(!tasks.length) return res.status(404).send('No hay tareas')
   res.json(tasks)

})
server.post('/api/tasks',(req, res)=> {
   const { title, description } = req.body
   if(!title) return res.status(400).send('Faltan datos')
   const newTask = {
      id: tasks.length + 1,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(), 
   }
   
   tasks.push(newTask)
   res.status(201).json(newTask)

})
server.put('/api/tasks/:id', (req, res) => {
   const { id } = req.params
   const editTask = req.body;
   
   const taskIndex = tasks.findIndex(task => task.id === parseInt(id))
   if (taskIndex === -1) return res.status(404).json({ error: "Tarea no encontrada" });
   
   tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...editTask
   }
   
   res.json(tasks)
})
server.delete('/api/tasks/:id', (req, res) => {
   const { id } = req.params
   const taskIndex = tasks.findIndex(task => task.id === parseInt(id))
   if (taskIndex === -1) return res.status(404).json({ error: "Tarea no encontrada" });
   tasks = tasks.filter(task => task.id !== parseInt(id))
   res.json(tasks)
})




server.listen(PORT,()=> console.log('Server is running on port 3002'))

