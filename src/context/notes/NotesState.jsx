import React, { Component } from 'react'
import NotesContext from './NotesContext'
export default class NotesState extends Component {
  host = 'http://localhost:5000';
  // eslint-disable-next-line 
  constructor(props) {
    super(props);
    const notesInitial=[];
    this.state = { notes: notesInitial,alert:false};
  }

  setAlert=(alert)=>{
    setTimeout(() => {
      this.setState({alert: alert});
    }, 2000);
  } 

  // Fetch the notes from the database
  getNotes = async () => {
    try{
      // API CALL
      const response = await fetch(`${this.host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    this.setState({ notes: json })}
    catch(err){
      console.error(err);
    }
  }

  // Add a note
  addNote = async (title, description, tag) => {
    try {    
      // API CALL
      const response = await fetch(`${this.host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      // eslint-disable-next-line
      const note = await response.json();
      this.setState({ notes: this.state.notes.concat(note) })
    } 
    catch(err){
      console.error(err);
    }
  }
  
  // Edit a note
  editNote = async (id, title, description, tag) => {
    try { 
      // API CALL
      const response = await fetch(`${this.host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      // eslint-disable-next-line
      const json = await response.json();
  
      const updatedNotes = this.state.notes.map(note => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });
      this.setState({ notes: updatedNotes });
    } 
    catch(err){
      console.error(err);
    }
  }

  // Delete a note
  deleteNote = async (id) => {
    try {  
      // API CALL
      const response = await fetch(`${this.host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      // eslint-disable-next-line
      const json = response.json();
      const note_after_del = this.state.notes.filter((note) => { return note._id !== id });
      this.setState({ notes: note_after_del ,alert:true});
    }
    catch(err){
      console.error(err);
    }
  }

  render() {
    return (
      <NotesContext.Provider value={{ notes: this.state.notes, addNote: this.addNote, deleteNote: this.deleteNote, editNote: this.editNote, getNotes: this.getNotes,setAlert:this.setAlert,alertState:this.state.alert}}>
        {this.props.children}
      </NotesContext.Provider>
    )
  }
}
