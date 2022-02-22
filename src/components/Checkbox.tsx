import React, {ChangeEvent} from "react";


type CheckboxPropsType = {
    isDone: boolean
    callback: (checked: boolean) => void
}

export const Checkbox = (props: CheckboxPropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }
    return <input type="checkbox"
                  onChange={onChangeHandler}
                  checked={props.isDone}
    />
};

