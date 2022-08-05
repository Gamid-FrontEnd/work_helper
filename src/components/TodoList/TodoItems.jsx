import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, toggleStatus } from '../../store/todoSlice';

import Form from 'react-bootstrap/Form'

const TodoItems = () => {
    const todos = useSelector(state => state.todos.todos)
    const dispatch = useDispatch();

  return (
    <ul className='todo_ul'>
        <Form>

            {
                todos.map((todo) => (
                    <li key={todo.id}>

                        <Form.Check 
                            type={'checkbox'}
                            id={"checker"}
                            checked={todo.completed} 
                            onChange={() => dispatch(toggleStatus(todo.id))}
                        />
                        <span className={todo.completed ? "text_done" : "text"}>{todo.title}</span>

                        {/* <label>
                            <input type="checkbox" className="checker"  checked={todo.completed} onChange={() => dispatch(toggleStatus(todo.id))} />
                            <span></span>
                        </label>
                        <span className="text">{todo.title}</span> */}
                        <span className='delete' onClick={() => dispatch(deleteTodo(todo.id))} >&times;</span>
                    </li>
                ))
            }
        </Form>
        </ul>
  )
}

export default TodoItems