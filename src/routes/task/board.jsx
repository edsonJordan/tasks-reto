import React, { useState, useEffect } from 'react';
import { ClockIcon, PencilAltIcon, PlusIcon, SearchIcon, TrashIcon } from "@heroicons/react/outline";
import TaskFormComponent from 'Task/components/TaskFormComponent/TaskFormComponent';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../Task/utils/reducer/TaskReducer';
import { TaskDeleteComponent } from 'Task/components/TaskFormComponent/TaskDeleteComponent';
import { getTaskById, getTasks, updateListTask, updateStatusTask, updateTask } from 'Task/services/TaskLocalService';
import Moment from 'react-moment';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const store = createStore(reducer);

export const Board = () =>{
  const [isModalFormTask, setIsModalFormTask] = useState(false);
  const [modalData, setModalData] = useState({title:null, description:null});

  const [isModalDeleteTask , setIsModalDeleteTask] = useState(false)
  const [deleteTaskData,setDeleteTaskData] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [doTask, setDoTask]= useState([])
  const [readyTasks, setReadyTasks] =useState([])
  const [doneTasks, setDoneTasks] =useState([])

  useEffect(() => {
    const tasksData = getTasks();
    let doTask = tasksData.filter((element) => element.status === 1)
    let readyTask = tasksData.filter((element) => element.status === 2)
    let doneTask = tasksData.filter((element) => element.status === 3)
    setTasks(tasksData);
    setDoTask(doTask)
    setReadyTasks(readyTask);
    setDoneTasks(doneTask)
  }, []);

  const moveLastPosition=(item)=>{

  }
  const reOrderTasks = (taskList,idElementInicial,DataDestino, status=null) =>{
    const data = taskList.slice();
    // const taskReverse = data.reverse();
    const indexDataResource = data.findIndex(task => task.id === idElementInicial);
    const indexDataDestination = data.findIndex(task => task.id === DataDestino.id);
    //elemento a mover
    const dataCopy= data.slice();
    let dataOriginal = {};
    const dataSource = dataCopy.splice(indexDataResource, 1)[0];
    if(status!==null){
      dataOriginal={...dataSource, status:status}
    }else{
      dataOriginal = dataSource;
    }
    dataCopy.splice(indexDataDestination, 0, dataOriginal);
    setTasks(dataCopy)
    updateListTask(dataCopy)
    // console.log(DataDestino);
  }
  useEffect(()=>{
    let doTask = tasks.filter((task) => task.status === 1)
    let readyTask = tasks.filter((task) => task.status === 2)
    let doneTask = tasks.filter((task) => task.status === 3)
    setDoTask(doTask)
    setReadyTasks(readyTask);
    setDoneTasks(doneTask)
  }, [tasks])

  // Modal Form Create, Edit Task
  const handleFormTask = (title, description, id, action) => {
    setIsModalFormTask(true);
    setModalData({title, description, id, action});
  };

  const handleCloseModal = () => {
    setIsModalFormTask(false);
  };

  // Modal Delete Form
  const handleDeleteTask= (idTask) => {
    setIsModalDeleteTask(true);
    setDeleteTaskData({idTask});
  };

  const handleCloseDeleteTask = () => {
    setIsModalDeleteTask(false);
  };


  const handleDataFromFormTask = (tasks) => {
    setTasks(tasks)
    // Haz algo con los datos recibidos del componente hijo
  };

  useEffect(() => {


    if (isModalFormTask || isModalDeleteTask) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    /* return () => {
      document.body.classList.remove('modal-open');
    } */;
  }, [isModalFormTask, isModalDeleteTask]);


  return(


    <div className="w-full flex flex-col items-center gap-6 min-h-screen">
    {isModalFormTask &&
      <Provider store={store}>
        <TaskFormComponent onClose={handleCloseModal} data={modalData} sendDataToBoard={handleDataFromFormTask}/>
      </Provider>
      }

      {isModalDeleteTask &&
        <TaskDeleteComponent onClose={handleCloseDeleteTask} data={deleteTaskData} sendDataToBoard={handleDataFromFormTask}/>
      }
      <DragDropContext onDragEnd={(result)=>{
          const { source, destination } = result;
          if (!destination) {
            return;
          }
            if(source.droppableId === destination.droppableId){
              // console.log(source.droppableId);
              let conteoLista= 0;
              let ultimoElemento= {};
              let elementOriginal= {};
              let idElementOriginal= result.draggableId;
              let elementIndiceDestino = {};
              switch (source.droppableId) {
                case "doTasks":
                  conteoLista = doTask.length;
                  ultimoElemento = doTask[conteoLista-1]
                  elementOriginal= doTask[source.index];
                  if(doTask[destination.index+1] === undefined){
                    reOrderTasks(tasks,idElementOriginal,ultimoElemento)
                  }else{
                    elementIndiceDestino = doTask[destination.index];
                    reOrderTasks(tasks,idElementOriginal,elementIndiceDestino)
                  }
                  break;
                case "readyTasks":
                  console.log(result);
                  conteoLista=readyTasks.length
                  ultimoElemento = readyTasks[conteoLista-1]
                  elementOriginal=readyTasks[source.index];
                  if(readyTasks[destination.index+1] === undefined){
                    reOrderTasks(tasks,idElementOriginal,ultimoElemento)
                  }else{
                    elementIndiceDestino = readyTasks[destination.index];
                    reOrderTasks(tasks,idElementOriginal,elementIndiceDestino)
                  }
                  break;
                case "doneTasks":
                  conteoLista=doneTasks.length
                  ultimoElemento = doneTasks[conteoLista-1]
                  if(doneTasks[destination.index+1] === undefined){
                    reOrderTasks(tasks,idElementOriginal,ultimoElemento)
                  }else{
                    elementIndiceDestino = doneTasks[destination.index];
                    reOrderTasks(tasks,idElementOriginal,elementIndiceDestino)
                  }
                  break;
                default:
                  break;
              }
            }
            else{
              let conteoLista= 0;
              let ultimoElemento= {};
              let elementOriginal= {};
              let elementIndiceDestino = {};
              let idElementOriginal= result.draggableId;
              switch (destination.droppableId) {
                case "doTasks":
                  if(doTask.length==0){
                    const task=getTaskById(idElementOriginal)
                    updateStatusTask({
                      ...task,
                      status:1
                    })
                    const listTasks = getTasks()
                    setTasks(listTasks)

                    break
                  }
                  conteoLista = doTask.length;
                  ultimoElemento = doTask[conteoLista-1]
                  elementOriginal= doTask[source.index];
                  if(doTask[destination.index+1] === undefined){
                    reOrderTasks(tasks,idElementOriginal,ultimoElemento, 1)
                  }else{
                    elementIndiceDestino = doTask[destination.index];
                    console.log(elementOriginal);
                    reOrderTasks(tasks,idElementOriginal,elementIndiceDestino, 1)
                  }
                  break;
                case "readyTasks":
                  if(readyTasks.length==0){
                    const task=getTaskById(idElementOriginal)
                    updateStatusTask({
                      ...task,
                      status:2
                    })
                    const listTasks = getTasks()
                    setTasks(listTasks)
                    break
                  }
                  conteoLista=readyTasks.length
                  ultimoElemento = readyTasks[conteoLista-1]
                  elementOriginal=readyTasks[source.index];
                  if(readyTasks[destination.index+1] === undefined){
                    reOrderTasks(tasks,idElementOriginal,ultimoElemento, 2)
                  }else{
                    elementIndiceDestino = readyTasks[destination.index];
                    reOrderTasks(tasks,idElementOriginal,elementIndiceDestino, 2)
                  }
                  break;
                case "doneTasks":
                  if(doneTasks.length==0){
                    const task=getTaskById(idElementOriginal)
                    updateStatusTask({
                      ...task,
                      status:3
                    })
                    const listTasks = getTasks()
                    setTasks(listTasks)
                    break
                  }
                  conteoLista=doneTasks.length
                  ultimoElemento = doneTasks[conteoLista-1]
                  elementOriginal=doneTasks[source.index];
                  if(doneTasks[destination.index+1] === undefined){
                    reOrderTasks(tasks,idElementOriginal,ultimoElemento,3)
                  }else{
                    elementIndiceDestino = doneTasks[destination.index];
                    reOrderTasks(tasks,idElementOriginal,elementIndiceDestino,3)
                  }
                  break;
                default:
                  break;
              }
            }
        return }
        }>
        <h1 className="text-3xl font-bold underline text-red-700">Project Tasks</h1>
        <div className="grid grid-cols-9 w-4/5 align-middle gap-4">
          {/* Nav List */}



          <div className=" flex flex-col gap-3 col-span-2 ">
            <div className="flex items-center justify-center">
              <div className="relative w-full">
                <input
                  type="text"
                  className="border border-gray-300 w-full  rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Buscar palabras clave"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-full text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-gray-blue   justify-center rounded-md p-4 gap-3">
              <div className=" w-full flex justify-between items-center">
                <h2 className="font-bold text-gray-800" >List Taks</h2>
                <div onClick={()=>{handleFormTask("", "",null, "create")}} className="w-8 flex justify-center items-center bg-gray-light rounded-full cursor-pointer  ">
                  <PlusIcon className="w-8 text-black p-2 " />
                </div>
              </div>
              {/* Container Cards */}

              {/* Card */}
              <Droppable droppableId="doTasks">
                {
                  (droppableProvided)=>(
                    <div className="flex flex-col gap-4  container__cards"
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        >
                      {
                        doTask.map((task, index)=>(
                          <Draggable key={"do"+task.id} draggableId={task.id} index={index}>
                            {
                              (draggableProvided)=>(
                                <div className="flex flex-col gap-1  w-full bg-white rounded-md  shadow "
                                  {...draggableProvided.draggableProps}
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.dragHandleProps}
                                  >
                                <div className="p-4 pb-0">
                                  <p className="text-gray-700 font-semibold text-base">
                                    {task.title}
                                  </p>
                                  <span className="text-gray-500 text-sm">
                                    {task.description}
                                  </span>
                                </div>
                                <hr className="my-2 border-gray-300"/>
                                <div className=" flex flex-row justify-between p-4 pt-0 text-gray-700">
                                  <div className="flex flex-row gap-1 items-center font-semibold">
                                    <ClockIcon className="w-4 "/>
                                    <span className="text-sm">
                                      <Moment format="MMMM D, hh:mm A">{task.createdAt}</Moment>
                                    </span>
                                  </div>
                                  <div className="flex gap-3 p-1 font-semibold  ">
                                    <PencilAltIcon onClick={()=>{handleFormTask(task.title, task.description, task.id, "edit")}} className="w-4 text-blue-700 cursor-pointer font-bold "/>
                                    <TrashIcon onClick={()=>{handleDeleteTask(task.id)}} className="w-4 text-red-700 cursor-pointer font-bold "/>
                                  </div>
                                </div>
                              </div>
                              )
                            }
                          </Draggable>
                          )
                        )
                      }
                      {droppableProvided.placeholder}
                    </div>
                  )
                }
              </Droppable>
            </div>
          </div>
          {/* To do List */}
          <Droppable droppableId="readyTasks">
            {
              (droppableProvided)=>(
                <div className="flex flex-col gap-3 items-start bg-gray-blue col-span-3 rounded-md p-3"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                  >
                <h2 className="font-bold text-gray-800">To Ready</h2>
                {
                readyTasks.map((element,index)=>{
                  return (
                    <Draggable key={element.id} draggableId={element.id} index={index}>
                      {
                         (draggableProvided)=>
                         (
                            <div className="flex flex-col w-full  bg-orange-200 rounded-md  shadow"
                              {...draggableProvided.draggableProps}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.dragHandleProps}
                            >
                      <div className="p-4 ">
                                <p className="text-orange-900 font-semibold text-base">
                                {element.title}
                                </p>
                                <span className="text-orange-800 text-sm">
                                {element.description}
                                </span>
                      </div>
                      <hr className=" border-orange-500"/>
                      <div className=" flex flex-row bg-orange-100 justify-between p-4  text-gray-700">
                                <div className="flex text-orange-900  flex-row gap-1 items-center font-semibold">
                                  <ClockIcon className="w-4 "/>
                                  <span className="text-sm">
                                  <Moment format="MMMM D, hh:mm A">{element.createdAt}</Moment>
                                  </span>
                                </div>
                                <div className="flex gap-3 p-1 font-semibold  ">
                                <PencilAltIcon onClick={()=>{handleFormTask(element.title, element.description, element.id, "edit")}} className="w-4 text-blue-700 cursor-pointer font-bold "/>
                                  <TrashIcon onClick={()=>{handleDeleteTask(element.id)}} className="w-4 text-red-700 cursor-pointer font-bold "/>
                                </div>
                      </div>
                            </div>
                         )
                      }

                    </Draggable>

                    )
                  })
                }
              </div>
              )
            }
          </Droppable>
          <Droppable droppableId="doneTasks">
            {
              (droppableProvided)=>(
                <div className="flex flex-col gap-3 items-start bg-gray-blue col-span-3 rounded-md p-3"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                  >
                <h2 className="font-bold text-gray-800">Done</h2>
                {
                doneTasks.map((element,index)=>{
                  return (
                    <Draggable key={element.id} draggableId={element.id} index={index}>
                      {
                         (draggableProvided)=>
                         (
                            <div className="flex flex-col w-full  bg-green-200 rounded-md  shadow"
                              {...draggableProvided.draggableProps}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.dragHandleProps}
                            >
                              <div className="p-4 ">
                                        <p className="text-green-900 font-semibold text-base">
                                        {element.title}
                                        </p>
                                        <span className="text-green-800 text-sm">
                                        {element.description}
                                        </span>
                              </div>
                              <hr className=" border-green-500"/>
                              <div className=" flex flex-row bg-green-100 justify-between p-4  text-gray-700">
                                        <div className="flex text-green-900  flex-row gap-1 items-center font-semibold">
                                          <ClockIcon className="w-4 "/>
                                          <span className="text-sm">
                                          <Moment format="MMMM D, hh:mm A">{element.createdAt}</Moment>
                                          </span>
                                        </div>
                                        <div className="flex gap-3 p-1 font-semibold  ">
                                        <PencilAltIcon onClick={()=>{handleFormTask(element.title, element.description, element.id, "edit")}} className="w-4 text-blue-700 cursor-pointer font-bold "/>
                                        </div>
                              </div>
                            </div>
                         )
                      }
                    </Draggable>
                    )

                  })
                }
              </div>
              )
            }
          </Droppable>

        </div>
      </DragDropContext>
    </div>

)
};
