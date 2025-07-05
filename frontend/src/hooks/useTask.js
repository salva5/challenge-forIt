import { useState, useEffect } from "react";
export const useTask = () => {
   const [tasks, setTasks] = useState([]);

   const deleteTask = (id) => {

      fetch(`${import.meta.env.VITE_API_URL}/asas${id}`, {
         method: 'DELETE',
      })
         .then(res => {
            if (!res.ok) throw new Error('No se elimino la tarea');
            return res.json();
         })
         .then(data => {
            setTasks(data)
            // Aquí podrías actualizar el estado de la lista de tareas
         })
         .catch(err => alert(err));
   }
   const createTask = (newTask) => {
      fetch(import.meta.env.VITE_API_URL, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newTask)
      })
      .then(res => res.json())
      .then((data ) => setTasks([...tasks,data]))
      .catch(() => alert('No se pudo crear la tarea'))
   }
   const editTask = (id, task) => {
      fetch(`${import.meta.env.VITE_API_URL}/${parseInt(id)}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(task),
      })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => alert('No se pudo crear la tarea'))
   }

   useEffect(() => {
      fetch(import.meta.env.VITE_API_URL)
         .then(res => {
            if(!res.ok) throw new Error('Error al obtener las tareas')
            return res.json()
         })
         .then(data => setTasks(data))
         .catch(err => alert(err))
   },[])
   return { tasks, deleteTask, editTask, createTask };
}