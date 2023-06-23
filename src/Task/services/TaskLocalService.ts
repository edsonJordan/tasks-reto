import {  ErrorTask } from "Task/models/ErrorTask";
import { Task } from "../models/Task";

const TASK_EXISTE="Existe el task";
const TASK_SUCCESS="Task agregado satisfactoriamente";
const TASK_EDIT="Task editado satisfactoriamente";
const TASK_NO_EXISTE="No existe el task";


export const updateListTask = (tasks:Task[]):void =>{
  const tasksString = JSON.stringify(tasks); // Convertir a cadena de texto
  localStorage.setItem('tasks', tasksString);
}
export const getTasks = (): Task[] => {
    const tasksJSON = localStorage.getItem('tasks');
    if (tasksJSON) {
      const tasksData: Task[] = JSON.parse(tasksJSON);
      // Convertir las cadenas de texto a objetos Date
      tasksData.forEach(task => {
        task.createdAt = new Date(task.createdAt);
      });
      return tasksData;
    }
    return [];
  };

  export const addTask = (task: Task): ErrorTask => {
    if(isTaskExists(task.title)){
      return {
        code:401,
        message:TASK_EXISTE
      }
    }
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return {
        code:201,
        message:TASK_SUCCESS
    }
  };

  export const updateTask = (task: Task): ErrorTask => {
    const tasks = getTasks();
    if(isTaskExists(task.title)){
      return {
        code:401,
        message:TASK_EXISTE
      }
    }
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    return {
      code:201,
      message:TASK_EDIT
    }
  };
  export const updateStatusTask = (task: Task): ErrorTask => {
    const tasks = getTasks();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    return {
      code:201,
      message:TASK_EDIT
    }
  };

  export const deleteTask = (taskId: string): void => {
    const tasks = getTasks();
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  };

  export const getCountTask = (): number => {
    const tasks = getTasks();
    return tasks.length || 1; // Establecer 1 como valor predeterminado si no hay datos
  };

  export const isTaskExists = (title:string): boolean => {
    const tasksLocal = getTasks();
    return tasksLocal.some((element) => element.title === title);
  };

  export const getTaskById = (taskId: string): Task | undefined => {
    const tasks = getTasks();
    return tasks.find((task) => task.id === taskId);
  };
