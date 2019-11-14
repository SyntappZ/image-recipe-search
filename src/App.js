import React from 'react';
import logo from './logo.svg';
import recipeData from './recipeData'
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <button className="btn" onClick={ uploadImage }>upload</button>
      </header>
    </div>
  );
}



export default App;
