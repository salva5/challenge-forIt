import { useNavigate } from "react-router"
import TaskItem from "./TaskItem"
import Button from "react-bootstrap/Button"

const TaskList = ({tasks, deleteTask, setEdit, editTask}) => {
   
   const navigate = useNavigate()
   return (
      <>
         <Button onClick={() => navigate("/")}> Nueva tarea</Button>
         {tasks &&
            tasks.map((task) => {
               return (
                  <TaskItem
                     key={task.id}
                     id={task.id}
                     title={task.title}
                     description={task.description}
                     deleteTask={deleteTask}
                     completed={task.completed}
                     setEdit={setEdit}
                     editTask={editTask}
                  />
               );
            })}
      </>
   );
}
export default TaskList