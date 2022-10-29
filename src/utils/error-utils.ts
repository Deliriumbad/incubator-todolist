import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {ActionsType} from "../features/TodolistsList/tasks-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ActionsType | SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occurred' ))
    dispatch(setStatusAC('failed'))
}