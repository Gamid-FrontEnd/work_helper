import React from 'react'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { pushTodo, createError } from '../../store/todoSlice';



const AddTodo = () => {
    const todos = useSelector(state => state.todos.todos)
    let dispatch = useDispatch();
    const text_ref = useRef();
    const [text, setText] = useState('');

    let text_change = () => {
        setText(text_ref.current.value);
    }

    let addTodo = () => {
        let checkLength = () => {
            let result = false;
            text_ref.current.value.split(' ').map(word => {
                if(word.length > 30) {
                    result = true
                }
            })

            return result;
        }

        if(todos.length > 20) {
            dispatch(createError('Too much todos!'))
        } else if(text_ref.current.value.trim() === '') {
            dispatch(createError('Please enter correct todo!'))
        } else if(checkLength()) {
            dispatch(createError('Todo is incorrect! Word length cannot be longer than 30 characters!'))
        } else if(text_ref.current.value.length > 100) {
            dispatch(createError('Todo is too long!'))
        } else {
            dispatch(createError(null))
            dispatch(pushTodo(text));
            text_ref.current.value = ''
        }
    }

  return (
    <div className='addtodo_div'>
        <input type='text' ref={text_ref} onChange={text_change}/>
        <button onClick={() => addTodo()}>ADD TODO</button>
    </div>
  )
}

export default AddTodo