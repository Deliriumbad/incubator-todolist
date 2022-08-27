import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "1b7699e2-f330-483d-8e4c-a8f8fa802aee"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}

type DeleteUpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
    },
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
        return promise;
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/Tasks${taskId}`);
    }
}


/*
getTasks(todolistId: string) {
    const promise = axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings);
    return promise;
}*/
