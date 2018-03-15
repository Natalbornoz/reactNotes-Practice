import React, { Component } from 'react';
import './App.css';

import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';

class App extends Component {

  //Para poder mostrar notas en estado
  constructor() {
    super();
    //Almacenará datos de nuestra aplicación
    this.state = {
      notes: [
        {noteId: 1, noteContent: 'note 1'},
        {noteId: 2, noteContent: 'note 2'}
      ]
    };
    this.addNote = this.addNote.bind(this);
  }

  removeNote() {

  }

  // para guardar notas
  addNote(note) {
    // obten las notas desde el estado
    let { notes } = this.state;
    notes.push({
      noteId: notes.lenght + 1,
      noteContent: note
  });
  // Para actualizar estado
  this.setState({ notes });

}
  render() {
    return (
      // Nombre contenedor de todo el proyecto y las secciones del sitio
      <div className="notesContainer">
        
          <div className="notesHeader">
            <h1>React y Firebase App</h1>
          </div>
          {/* Cuerpo de la aplicacion */}
          <div className="notesBody">
            {/* Desde el inicial , quiero recorrer las notas a traves de map */}
            <ul>
            {
              this.state.notes.map(note => {
                return (
                  <Note
                  noteContent ={note.noteContent}
                  noteId={note.noteId}
                  key={note.noteId}
                  />
                )
              })
            }
            </ul> 
          </div>

          {/* Acá irá el formulario */}
          <div className="notesFooter">
            <NoteForm addNote={this.addNote}/>
          </div>
      </div>
    );
  }
}

export default App;
