import React from 'react'
import { NavLink } from 'react-router-dom'

import './menu.scss'

const Menu = () => {
  return (
    <div className='menu_div'>
        <ul className='menu_ul'>
            <NavLink className="menu_navlink" to="/todo">Todo List</NavLink>
            <NavLink className="menu_navlink" to="/timer">Timer</NavLink>
            <NavLink className="menu_navlink" to="/stopwatch">Stopwatch</NavLink>
            <NavLink className="menu_navlink" to="/pomodoro">Pomodoro Clock</NavLink>
        </ul>
    </div>
  )
}

export default Menu