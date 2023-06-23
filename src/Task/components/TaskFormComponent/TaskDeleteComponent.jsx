import { deleteTask, getTasks } from 'Task/services/TaskLocalService';
import React, {useState, useEffect, useRef } from 'react';


export const TaskDeleteComponent = ({ onClose, data=null, sendDataToBoard}) =>
{
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteTask(data.idTask)
    sendDataToBoard(getTasks());
    onClose(true);
  };

  return(
    <div className="flex items-center justify-center absolute w-screen z-50 h-full bg-gray-400 bg-opacity-50 " >

    <form onSubmit={handleSubmit} className="bg-white w-1/5  shadow-md rounded px-8 pt-6 pb-8 mb-4">

    <div className="flex flex-col text-center justify-end">
    <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
    <p className="mb-4">¿Estás seguro de que deseas eliminar este registro?</p>
    </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Eliminar</button>
          <button className="bg-red-400 py-2 px-4 font-bold hover:bg-red-500 modal-close rounded focus:outline-none focus:shadow-outline" onClick={onClose}>
            Cerrar
          </button>
        </div>

      </form>

  </div>

)};

export default TaskDeleteComponent;
