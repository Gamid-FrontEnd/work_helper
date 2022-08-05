import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodo = createAsyncThunk(
    'todos/fetchTodo',
    async function(_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if (!response.ok) {
                throw new Error('Server Error');
            }

            const data = await response.json();

            return data;

        } catch (error){
            return rejectWithValue(error.message)
        }
    } 
);

export const pushTodo = createAsyncThunk(
    'todos/pushTodo',
    async function(text, {rejectWithValue, dispatch}) {
        let todo = {
            title: text,
            userId: 1,
            completed: false,
        }
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            });

            if (!response.ok) {
                throw new Error('Can\'t add task. Server Error.')
            }

            dispatch(addTodo(todo))


        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id)

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            })

            if (!response.ok) {
                throw new Error('Can\'t toggle task. Server Error.')
            }

            dispatch(toggleTodo(id))

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Can\'t toggle task. Server Error.')
            }

            dispatch(removeTodo(id))

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const todoSlice = createSlice({
    name: 'todo',

    initialState: {
        todos: [],
        status: null,
        error: null,
    },

    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        toggleTodo(state, action) {
            const toggleTodo = state.todos.find(todo => todo.id === action.payload);
            toggleTodo.completed = !toggleTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.completed !== true && todo.id !== action.payload)
        },
        createError(state, action) {
            state.error = action.payload;
        }
    },

    extraReducers: {
        [fetchTodo.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchTodo.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload
        },
        [fetchTodo.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        },
        [pushTodo.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        },
        [toggleStatus.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        },
        [deleteTodo.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload
        }
    }
});

export const {addTodo, toggleTodo, removeTodo, createError} = todoSlice.actions;
export default todoSlice.reducer;