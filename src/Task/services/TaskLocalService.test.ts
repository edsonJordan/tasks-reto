import 'mock-local-storage';
import _ from 'lodash';


import {
  addTask,
  isTaskExists,
  getTasks,
  updateTask,
  deleteTask,
  updateListTask,
  getCountTask,
  getTaskById,
  updateStatusTask
} from './TaskLocalService';
import { Task } from '../models/Task';
import { ErrorTask } from '../models/ErrorTask';

describe('TaskLocalService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('addTask should add a task to the list', () => {
    // Preparar
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Task description',
      status: 0,
      createdAt: new Date()
    };
    const expectedMessage = 'Task agregado satisfactoriamente';

    // Actuar
    const result: ErrorTask = addTask(task);

    // Comprobar
    expect(result.code).toBe(201);
    expect(result.message).toBe(expectedMessage);

    // Comprobar que la tarea se agregó correctamente
    const tasks = getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(task);
  });

  test('isTaskExists should return true if task exists', () => {
    // Preparar
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Task description',
      status: 0,
      createdAt: new Date()
    };
    addTask(task);

    // Actuar
    const result = isTaskExists(task.title);

    // Comprobar
    expect(result).toBe(true);
  });

  test('updateTask should update an existing task', () => {
    // Preparar
  const task: Task = {
    id: '1',
    title: 'Task 1',
    description: 'Task description',
    status: 0,
    createdAt: new Date()
  };
  addTask(task);
  const updatedTask: Task = {
    id: '1',
    title: 'Updated Task',
    description: 'Updated task description',
    status: 1,
    createdAt: new Date()
  };
  const expectedMessage = 'Task editado satisfactoriamente';

  // Actuar
  const result: ErrorTask = updateTask(updatedTask);

  // Comprobar
  expect(result.code).toBe(201);
  expect(result.message).toBe(expectedMessage);

  // Comprobar que la tarea se actualizó correctamente
  const tasks = getTasks();
  expect(tasks.length).toBe(1);

  // Comparar las propiedades relevantes del objeto actualizado
  expect(tasks[0].id).toEqual(updatedTask.id);
  expect(tasks[0].title).toEqual(updatedTask.title);
  expect(tasks[0].description).toEqual(updatedTask.description);
  expect(tasks[0].status).toEqual(updatedTask.status);
  });

  test('deleteTask should remove a task from the list', () => {
    // Preparar
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Task description',
      status: 0,
      createdAt: new Date()
    };
    addTask(task);

    // Actuar
    deleteTask(task.id);

    // Comprobar
    const tasks = getTasks();
    expect(tasks.length).toBe(0);
  });

  test('updateListTask should update the list of tasks in localStorage', () => {
    // Preparar
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Task description',
          status: 0,
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'Task 2',
          description: 'Task description',
          status: 0,
          createdAt: new Date()
        }
      ];

      // Actuar
      updateListTask(tasks);

      // Comprobar
      const tasksFromStorage = getTasks();
      expect(tasksFromStorage).toEqual(tasks);
  });

  test('getCountTask should return the number of tasks in the list', () => {
    // Preparar
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Task description',
        status: 0,
        createdAt: new Date()
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Task description',
        status: 0,
        createdAt: new Date()
      }
    ];
    updateListTask(tasks);

    // Actuar
    const count = getCountTask();

    // Comprobar
    expect(count).toBe(2);
  });

  test('getTaskById should return the task with the specified ID', () => {
    // Preparar
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Task description',
        status: 0,
        createdAt: new Date()
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Task description',
        status: 0,
        createdAt: new Date()
      }
    ];
    updateListTask(tasks);
    const taskId = '2';

    // Actuar
    const task = getTaskById(taskId);

    // Comprobar
    expect(task).toEqual(tasks[1]);
  });

  test('updateStatusTask should update the status of an existing task', () => {
    // Preparar
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Task description',
      status: 0,
      createdAt: new Date()
    };
    addTask(task);
    const updatedTask: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Task description',
      status: 1,
      createdAt: new Date()
    };
    const expectedMessage = 'Task editado satisfactoriamente';

    // Actuar
    const result: ErrorTask = updateStatusTask(updatedTask);

    // Comprobar
    expect(result.code).toBe(201);
    expect(result.message).toBe(expectedMessage);

    // Comprobar que el estado de la tarea se actualizó correctamente
    const tasks = getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].status).toBe(1);
  });
});
