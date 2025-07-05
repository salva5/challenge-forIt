import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const TaskItem = ({title,completed,description, id,deleteTask,editTask, setEdit}) => {
   const [checked, setChecked] = useState(completed)
   const navigate = useNavigate()

   
   const handleClick = () => {
      navigate(`/edit/${id}`)
      setEdit(true)
   }
   const handleCheck = () => {
      setChecked(!checked)
      editTask(id,{ completed: !checked} )
   }
   return (
      <>
         <Card>
            <Card.Body>
               <div className="d-flex gap-3 align-items-center">
                  <div>
                     <Form.Check
                        type='checkbox'
                        checked={checked}
                        onChange={handleCheck}
                     />
                  </div>
                  <div className="card-data">
                     <Card.Title className={checked && 'text-decoration-line-through text-success'}>{title}</Card.Title>
                     <Card.Text className={checked && 'text-decoration-line-through text-success'}>{description}</Card.Text>
                  </div>
               </div>

               <div>
                  <Button variant="danger" onClick={() => deleteTask(id)}>
                     <i className="bi bi-trash"></i>
                  </Button>
                  <Button variant="primary" onClick={handleClick}>
                     <i className="bi bi-pencil"></i>
                  </Button>
               </div>
            </Card.Body>
         </Card>
      </>
   );
};

export default TaskItem;