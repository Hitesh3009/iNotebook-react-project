import React, { Component } from 'react'
import NotesContext from '../context/notes/NotesContext'
import Alert from '@mui/material/Alert';
export default class AddNote extends Component {
  static contextType = NotesContext
  addNote = this.context
  constructor() {
    super();
    this.state = { newNote: { title: "", description: "", tag: "" },alert:false }
  }

  handleAddNewNote = (e) => {
    e.preventDefault();
    this.context.addNote(this.state.newNote.title, this.state.newNote.description, this.state.newNote.tag);
    this.setState({ newNote: { title: "", description: "", tag: "" },alert:true});
    setTimeout(() => {
      this.setState({ alert: false });
    }, 2000);
  }

  handleUserInp = (e) => {
    this.setState({ newNote: { ...this.state.newNote, [e.target.id]: e.target.value } }); // ...this.state.newNote means keep the object defined earlier{title:"",description:"",tag:"default"} and further part tells to overwrite it
  }


  render() {
    return (
      <>
          {
            // Alert for the new note
            this.state.alert && (<Alert severity="success" variant='filled' className='-mt-14'>
              <p className='text-lg'>Added a new note successfully :)</p>
            </Alert>)
          }

        <form className="space-y-10 pt-3">
          <center><h2 className='text-xl md:text-2xl w-48 py-2 rounded-lg bg-violet-500 text-white'>ADD NOTE</h2></center>
          <div id="AddNoteOuterContainer" className='flex justify-center items-center'>
            <div id="AddNoteInnerContainer" className='w-[22rem] h-full md:w-8/12 lg:w-7/12 lg:h-full px-5 bg-white rounded-2xl shadow-xl shadow-neutral-700'>
              <div id="Note" className='flex flex-col space-y-4 p-2 lg:p-0 md:space-y-3'>
                <span></span>
                <span className='underline font-bold text-base md:text-lg'>Title</span>
                <input type="text" id='title' placeholder='Add Title to your note' className='p-1.5 w-full outline-none border-2 border-black rounded-lg md:text-base' onChange={this.handleUserInp} value={this.state.newNote.title} minLength={3} required />
                <span className='underline font-bold text-base md:text-lg'>Description</span>
                <textarea id="description" rows="5" placeholder='Give description to your note' className='border-2 border-black outline-none p-1 text-sm rounded-lg md:text-base' onChange={this.handleUserInp} value={this.state.newNote.description} minLength={6} required></textarea>
                <span className='underline font-bold text-base md:text-lg'>Tag</span>
                <input type="text" id='tag' placeholder='Add tag to your note' className='p-1.5 w-full outline-none border-2 border-black rounded-lg md:text-base' onChange={this.handleUserInp} value={this.state.newNote.tag} />
                <center><button disabled={this.state.newNote.title.length < 3 || this.state.newNote.description.length < 6} type="submit" className={`bg-blue-500 text-white w-32 rounded-md py-1 lg:py-2 mb-2 disabled:opacity-40`} onClick={this.handleAddNewNote}>Add New Note</button></center>
              </div>
            </div>
          </div>
        </form>
      </>
    )
  }
}
