import React, {useState} from 'react';
import './App.scss';
import FormComponent from "./components/FormComponent/FormComponent";
import ToDoComponentFunc from "./components/ToDoComponentFunc/ToDoComponentFunc";
import ToDoComponent from "./components/ToDoComponent/ToDoComponent";
import GameDesigners from "./components/GameDesigners/gameDesigners";

function App() {
  const [currentPage, setCurrentPage] = useState('clear');
  return (
    <div className="App">
      <header className="App-header">
        <div className="nav">
          <button className="nav-item" onClick={() => {
            setCurrentPage('clear');
          }}>Clear</button>
          <button className="nav-item" onClick={() => {
            setCurrentPage('gameDevelopersPage');
          }}>Game Developers</button>
          <button className="nav-item" onClick={() => {
            setCurrentPage('formPage');
          }}>Form</button>
          <button className="nav-item" onClick={() => {
            setCurrentPage('toDoPage');
          }}>ToDo</button>
        </div>
      </header>
      {currentPage === 'clear' ? null : null}
      {currentPage === 'gameDevelopersPage' ? <GameDesigners /> : null}
      {currentPage === 'formPage' ? <FormComponent /> : null}
      {currentPage === 'toDoPage' ? <ToDoComponentFunc /> : null}
    </div>
  );
}

export default App;
