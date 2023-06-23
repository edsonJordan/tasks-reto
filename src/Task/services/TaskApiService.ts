import axios from 'axios';

const API_URL = 'http://api.example.com/tasks';

// Obtener todas las tareas
export const getAllTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener una tarea por su ID
export const getTaskById = async (taskId: string) => {
  const response = await axios.get(`${API_URL}/${taskId}`);
  return response.data;
};

// Crear una nueva tarea
export const createTask = async (taskData: any) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Actualizar una tarea existente
export const updateTask = async (taskId: string, taskData: any) => {
  const response = await axios.put(`${API_URL}/${taskId}`, taskData);
  return response.data;
};

// Eliminar una tarea
export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${API_URL}/${taskId}`);
  return response.data;
};