import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import { Todolist, TaskPropsType } from './Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

 let [tasks, setTasks] = useState<Array<TaskPropsType>>([
     { id: v1(), title: "HTML&CSS", isDone: true },
     { id: v1(), title: "JS", isDone: true },
     { id: v1(), title: "ReactJS", isDone: false },
     { id: v1(), title: "Redux", isDone: true }
 ])

    let[filter,setFilter] = useState<FilterValuesType>('all') //active

    console.log('---> tasks',tasks);
    let tasksForTodolist = tasks; //4

    if(filter==='completed'){
        tasksForTodolist = tasks.filter(el => el.isDone === true);
    }
    if(filter==='active'){
        tasksForTodolist = tasks.filter(el => el.isDone === false);//1
    }
    console.log('---> tasksForTodolist',tasksForTodolist);
    function changeFilter (value:FilterValuesType){
        setFilter(value);
    }

    function removeTask (newId:string){
        let filteredTask = tasks.filter(el => el.id !== newId);
        setTasks(filteredTask);
    }

    function addTask (title:string) {
        let newTask = { id: v1(), title: title, isDone: false };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId:string, checked:boolean) {
        //setTasks(tasks.map(el => el.id === taskId ? {...el, isDone} : el))
        /*let task = tasks.find( el => el.id === taskId);
        if(task){
            task.isDone = checked
        }
        setTasks([...tasks])*/

        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone:checked} : el))
    }
    console.log('render');

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                task={tasksForTodolist}//1
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
