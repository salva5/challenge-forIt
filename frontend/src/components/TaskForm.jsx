import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const TaskForm = ({ edit, tasks, editTask ,createTask}) => {
   
   const navigate = useNavigate()
   let { id } = useParams();

   const [taskForm, setTaskForm] = useState({
      title:'',
      description:''
   })
   const [error, setError] = useState({})

   const handleChange = (e) => {
      const { value, name } = e.target
      setTaskForm({...taskForm,[name]: value} )
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      
      if(!taskForm.title) return setError({
         title: "Ingresa un titulo para la tarea",
      });

      if (edit) {
         editTask(id, taskForm) 
         navigate("/tasks")
      } else{
         createTask(taskForm)
         alert("Tarea creada")
      }
      setTaskForm({
         title:'',
         description:''
      })
      setError({})
      
   }
   useEffect(() => {
      if(!edit) return 
      const editTask = tasks.find(task => task.id === parseInt(id))
      setTaskForm({
         title: editTask.title,
         description: editTask.description
      })
      
   },[])
   return (
      <div className='form-container'>
         <Button onClick={() => navigate("/tasks")}>{edit ? 'volver':'Ver tareas'}</Button>
         <h2>{edit ? 'Edita una': 'Agrega una nueva' } tarea</h2>
         <Form onSubmit={handleSubmit} className="form">
            <Form.Group
               className="mb-3 form-titulo"
               controlId="exampleForm.ControlInput1"
            >
               <Form.Label>Título</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="¿Qué necesitas hacer?"
                  value={taskForm.title}
                  onChange={handleChange}
                  name="title"
               />
               {error.title && <p>{error.title}</p>}
            </Form.Group>
            <Form.Group
               className="mb-3 form-descripcion"
               controlId="exampleForm.ControlTextarea1"
            >
               <Form.Label>Descripción</Form.Label>
               <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Añade mas detalles(opcional)"
                  value={taskForm.description}
                  name="description"
                  onChange={handleChange}
               />
            </Form.Group>
            <Button type="submit">{edit ? "Editar" : "Añadir"} tarea</Button>
         </Form>
      </div>
   );
};

export default TaskForm