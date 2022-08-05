import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoItems from './TodoItems'
import AddTodo from './AddTodo'
import { fetchTodo } from '../../store/todoSlice'

import './todo.scss'

const TodoList = () => {
  const {status, error} = useSelector(state => state.todos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch])

  return (
    <div className='todoList_mainDiv'>
      <div className='todoList_div'>
        <AddTodo/>
        {status === 'loading' && <h2 className='loading_todo'>Loading...</h2>}
        {error && <h4 className='error_todo'>An error occured: {error}</h4>}
        <TodoItems/>
      </div>
    </div>
  )
}

export default TodoList