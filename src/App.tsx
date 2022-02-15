import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    let [filter, setFilter] = useState('All')//костыль, куда мы запишем значение коллбэк, который приходит от кнопки All
    const removeTask = (newId: string) => {
        setTasks(tasks.filter((el) => el.id !== newId))//при нажатии на крестик таска удаляется
    }

    let filteredTasks = tasks// по умолчанию 'All' - все таски
    if (filter === 'Active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }

    const changeFilter = (value: string) => {
        setFilter(value)
    }
    
    const addTask = (title:string) => {
      let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist title={'Hello, world'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
