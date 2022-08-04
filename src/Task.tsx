import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(props.task.id, props.todolistId)), [props.task.id, props.todolistId]);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const action = changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId);
        dispatch(action);
    }, [props.task.id, props.todolistId, dispatch])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        const action = changeTaskTitleAC(props.task.id, newValue, props.todolistId);
        dispatch(action);
    }, [props.task.id, props.todolistId, dispatch])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>


} )
