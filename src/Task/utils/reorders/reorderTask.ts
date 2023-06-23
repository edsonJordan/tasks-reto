import { getTasks } from "Task/services/TaskLocalService";

export const getIndexFromTask = (idTask:string): number => {
  const tasks = getTasks();
  const indexTask = tasks.findIndex(tasks => tasks.id === idTask);
  return indexTask
};
