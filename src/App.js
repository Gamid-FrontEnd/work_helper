import {HashRouter, Routes, Route} from "react-router-dom";

import Menu from "./components/menu/Menu";
import './app.scss'
import TodoList from "./components/TodoList/TodoList";
import Timer from "./components/Timer/Timer";


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Menu/>
        <Routes>
          <Route path="/todo" element={<TodoList/>}/>
          <Route path="/timer" element={<Timer/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
