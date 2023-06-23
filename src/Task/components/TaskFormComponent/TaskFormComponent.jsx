import React, {useState, useEffect, useRef } from 'react';
import { addTask, getCountTask, getTasks, isTaskExists, updateTask } from 'Task/services/TaskLocalService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { incrementIdCounter } from 'Task/utils/actions/TaskCountAction';


export const TaskFormComponent = ({ onClose, data=null, sendDataToBoard}) =>
{
  const idCounter = useSelector((state) => state.idCounter);
  const dispatch = useDispatch();

  const [idTask,setIdTask]=useState(null)
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(titleRef.current.value.length<4 || descriptionRef.current.value <4){
      return console.log("minimo de campos no suficientes ");
    }

    switch (data.action) {
      case "create":
        const titleTrim= title.replace(/\s/g, "");
        const newTask = {
          id:  titleTrim.slice(0, 2)+titleTrim.slice(-2)+(idCounter+1)+(idCounter), // Generar un ID único para la nueva tarea
          title,
          description,
          status: 1,
          createdAt: new Date(),
        };
        const responseCreate = addTask(newTask);
        if(responseCreate.code===201){
          dispatch(incrementIdCounter());
          titleRef.current.value = '';
          descriptionRef.current.value = '';
          onClose(true);
          sendDataToBoard(getTasks());
        }
        console.log(responseCreate.message);

        break;
      case "edit":
        const Task = {
          id:  data.id, // Generar un ID único para la nueva tarea
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          status: 3,
          createdAt: new Date(),
        };
        const responseEdit = updateTask(Task);
        if(responseEdit.code===201){
          titleRef.current.value = '';
          descriptionRef.current.value = '';
          onClose(true);
          sendDataToBoard(getTasks());
        }
          console.log(responseEdit.message);
        break;

      default:
        break;
    }


  };

  return(

  <div className="flex items-center justify-center absolute w-full z-50 h-full bg-gray-400 bg-opacity-50" >

    <form onSubmit={handleSubmit} className="bg-white w-1/5 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Titulo</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                  defaultValue={data.title}
                  ref={titleRef}
                  id="title"
                  type="text"
                  placeholder="Ingresa tu titulo"
                  onChange={(e) => setTitle(e.target.value)}
                  />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Descripción</label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue={data.description}
                  ref={descriptionRef}
                  type="text"
                  id="description"
                  placeholder="Ingresa descrión de la tarea"
                  onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">Enviar</button>
          <button className="bg-red-400 py-2 px-4 font-bold hover:bg-red-500 modal-close rounded focus:outline-none focus:shadow-outline" onClick={onClose}>
            Cerrar
          </button>
        </div>

      </form>

  </div>
)};

export default TaskFormComponent;
