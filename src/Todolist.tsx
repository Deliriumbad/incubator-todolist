import React, {useState, ChangeEvent, KeyboardEvent} from "react";

type TodolistType = {
    title: string
    tasks: Array<ObjectFromArray>
    removeTask: (id: string) => void
    changeFilter: (value: string) => void
    addTask: (title:string)=>void
}

type ObjectFromArray = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {

    let[title, setTitle] = useState('')
    
    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter'){
            addTask()
        }
    }

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    
    const onClickChangeFilterHandler = (value:string) => {
        props.changeFilter(value)
    }

    const onClickRemoveTaskHandler = (el:string) => {
        props.removeTask(el)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <button onClick={() => onClickRemoveTaskHandler(el.id)}>x</button>
                            <input type="checkbox" checked={el.isDone} />
                            <span>{el.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => onClickChangeFilterHandler('All')}>All</button>
                <button onClick={() => onClickChangeFilterHandler('Active')}>Active</button>
                <button onClick={() => onClickChangeFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
}