import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      // Nombre contenedor de todo el proyecto y las secciones del sitio
      <div className="notesContainer">
        
        <div className="notesHeader">
          <h1>React y Firebase App</h1>
        </div>
        <div className="notesBody">
        </div>
        <div className="notesFooter">
        </div>
      </div>
    );
  }
}

export default App;
