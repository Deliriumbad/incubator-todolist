import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type FullInputPropsType = {
    callback:()=>void
}

export const FullInput = (props:FullInputPropsType) => {
    let [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }
    const addTask = () => {
        props.callback();
        setTitle("");
    }

    return (
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
        </div>
    );
}