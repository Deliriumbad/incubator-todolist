import {setTodolistsAC} from "./todolists-reducer";
import {setTasksAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


let startState: TasksStateType = {}
beforeEach( ()=> {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
})

test('empty arrays should be added when we set todolist', ()=> {

    const action =  setTodolistsAC([
        {id: '1', title: 'title 1', addedDate: '', order: 0},
        {id: '2', title: 'title 2', addedDate: '', order: 0}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist', ()=> {
    const action =  setTasksAC(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})