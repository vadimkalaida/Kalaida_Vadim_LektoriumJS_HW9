import React, {useState, useEffect} from 'react';
import './App.scss';
// import FormComponent from "./components/FormComponent/FormComponent";
import FormComponentFunc from "./components/FormComponentFunc/FormComponentFunc";
import ToDoComponentFunc from "./components/ToDoComponentFunc/ToDoComponentFunc";
import GameDesignersFunc from "./components/GameDesignersFunc/GameDesignersFunc";

function App() {
  const [currentPage, setCurrentPage] = useState('clear');
  useEffect(() => {
    console.log('render');
  });
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
      {currentPage === 'gameDevelopersPage' ? <GameDesignersFunc /> : null}
      {currentPage === 'formPage' ? <FormComponentFunc /> : null}
      {currentPage === 'toDoPage' ? <ToDoComponentFunc /> : null}
    </div>
  );
}

export default App;
