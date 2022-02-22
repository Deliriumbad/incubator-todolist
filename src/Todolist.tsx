import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import './App.css';
import {Checkbox} from "./components/Checkbox";

type TodolistPropsType = {
    title: string
    task: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, checked: boolean) => void
    filter:FilterValuesType

}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist (props:TodolistPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')
    const onChangeHandler = (elId: string, checked: boolean) => {
        props.changeStatus(elId, checked)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='errorMessage'>{error}</div>}
            </div>
            <ul>
                {
                    props.task.map(elem => {
                        const onRemoveHandler = () => props.removeTask(elem.id);
                        /*const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(elem.id, e.currentTarget.checked)
                        }*/
                        return <li key={elem.id} className={elem.isDone ? 'isDone' : ''}>
                            <Checkbox isDone={elem.isDone}
                                      callback={(checked)=>onChangeHandler(elem.id, checked)}
                            />
                            {/*<input type="checkbox"
                                   onChange={(e) => onChangeHandler(elem.id, e.currentTarget.checked)}
                                   checked={elem.isDone}/>*/}
                            <span>{elem.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}