import { Todos } from "@/app/types/todo"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialState{
    todos:Todos[]
}
const initialState:InitialState = {
    todos:[]
}
const todoSlice = createSlice({
    name:'todo',
    initialState:initialState,
    reducers:{
        addTodo: (state:InitialState, action:PayloadAction<Todos>)=>{
            state.todos.push(action.payload)
        },
        deleTodo: (state:InitialState, action:PayloadAction<string>)=>{
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
        },
        finishTodo: (state, action)=>{
            const todo = state.todos.find((todo)=>todo.id === action.payload)
            if(todo){
                todo.finish = !todo.finish
            }
        },
        updateTodoContent:(state, action)=>{
            const { id, content} = action.payload
            const todo = state.todos.find((todo)=> todo.id === id)
            if(todo){
                todo.content = content
            }
        }
    }
})

export const {addTodo, deleTodo, finishTodo, updateTodoContent} = todoSlice.actions
export default todoSlice.reducer