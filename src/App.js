import React, { Component } from 'react';
//para conectar con base de  datos de firebase
import firebase from 'firebase';
import { Grid, Row, Col } from 'react-bootstrap';
import { DB_CONFIG } from './config/config';
import 'firebase/database';

import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import ProductList from './component/ProductList';
import ShoppingCart from './component/ShoppingCart';
import './App.css';


class App extends Component {

  //Para poder mostrar notas en estado
  constructor() {
    super();
    //Almacenará datos de nuestra aplicación
    this.state = {
      notes: [
        // {noteId: 1, noteContent: 'note 1'},
        // {noteId: 2, noteContent: 'note 2'}
      ]
    };

    // inicializar aplicacion de firebase
    this.app = firebase.initializeApp(DB_CONFIG);
    //para almacenar o eliminar notas en la base de datos
    //todos lo guardare dentro de una coleccion llamada 'notes'
    this.db = this.app.database().ref().child('notes');

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  //Componente que cargara los datos en mi estado acio
  //y se ejecuta despues de qu el componente se ha cargado en mi pantalla
  componentDidMount (){
    //Quiero del estado, las notas
    const { notes } = this.state;
    //cuando se agrega un nuevo dato (se adiciona un nuevo hijo)
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
    
      this.setState({ notes });
    });

    this.db.on('child_removed', snap => {
      for(let i= 0; i < notes.length; i++){
        if (notes[i].noteId = snap.key) {
          notes.splice(i, 1);
        }
      }
      this.setState({notes});
    });
  }


  removeNote(noteId) {
    this.db.child(noteId).remove();
  }
 
  // para guardar notas
  addNote(note) {
    // obten las notas desde el estado
  //   let { notes } = this.state;
  //   notes.push({
  //     noteId: notes.lenght + 1,
  //     noteContent: note
  // });
  // // Para actualizar estado
  // this.setState({ notes });
  
  //le pasaremos el dato que estamos recibiendo
  this.db.push().set({ noteContent: note });

}

  

  render() {
    return (
      // Nombre contenedor de todo el proyecto y las secciones del sitio
    <div className="contenedor">
      <div className="poleras">
        <Grid>
          <Row>
            <Col sm={8}>
              <ProductList />
            </Col>
            <Col sm={4}>
              <ShoppingCart />
            </Col>
          </Row>
        </Grid> 
      </div> 
        <div className="notesContainer">
          
            <div className="notesHeader">
              <h1>Comentarios</h1>
            </div>
            {/* Cuerpo de la aplicacion */}
            <div className="notesBody">
              {/* Desde el inicial , quiero recorrer las notas a traves de map */}
              <ul>
            
              {this.state.notes.map(note => {
                  return (
                    <Note
                      noteContent ={note.noteContent}
                      noteId={note.noteId}
                      key={note.noteId}
                      removeNote={this.removeNote}
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
      </div>
    );
  }
}

export default App;
