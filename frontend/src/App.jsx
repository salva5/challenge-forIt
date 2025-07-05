import { useState } from 'react'
import { Routes, Route } from "react-router";
import { useTask } from './hooks/useTask';
import './App.css'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
   const [edit, setEdit] = useState(false)
   const { tasks, deleteTask, createTask, editTask } = useTask();
   
   return (
      <>
         <Routes>
            <Route path="/" element={<TaskForm  tasks={tasks} createTask={createTask}/>}/>
            <Route path="/tasks" element={<TaskList setEdit={setEdit} tasks={tasks} deleteTask={deleteTask} editTask={editTask}/>}/>
            <Route path="edit/:id" element={<TaskForm edit={edit} tasks={tasks} editTask={editTask}/>}/>
         </Routes>
      </>
   );
}

export default App;
