import React, { Component } from 'react'
import NotesContext from '../context/notes/NotesContext'
export default class NotesItems extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }
    static contextType = NotesContext
    deleteNote = this.context
    setAlert=this.context
    handleDeleteClick=()=>{
    this.context.deleteNote(this.props.note._id);
    this.context.setAlert(false);
    }
    render() {
        return (
            <>
                <div id="note" className='border-2 border-black h-5/6 px-3.5 w-11/12 my-2 md:h-64 md:w-[48%] md:mx-1.5 lg:w-5/12 lg:m-1.5 xl:w-3/12 xl:h-72  bg-gradient-to-br from-orange-400 via-blue-100 to-green-500 rounded-xl flex flex-col'>
                    <div className='flex items-center justify-evenly'>
                        <div id="noteTitle" className='my-2 text-base md:text-lg text-center font-bold underline'>
                            <span>{this.props.note.title}</span>
                        </div>
                        <div id="notetag" className='font-bold'>
                            <span>{this.props.note.tag.charAt(0).toUpperCase()+this.props.note.tag.slice(1).toLowerCase()}</span>
                            {/* <span>{this.props.note.tag.slice(0,1).toUpperCase()+this.props.note.tag.slice(1,this.props.note.tag.length).toLowerCase()}</span> */}
                        </div>
                    </div>
                    <div id="noteDesc" className='mb-2 text-sm md:text-base flex-grow overflow-y-auto scrollbar-hide'>
                        <p className='text-pretty'>{this.props.note.description} </p>
                    </div>
                    <div id="functionalities" className='flex justify-evenly py-2 mt-auto'>
                        <i className="fa-solid fa-pen-to-square cursor-pointer text-lg md:text-xl" onClick={()=>this.props.updateNotes(this.props.note)}></i>
                        <i className="fa-regular fa-trash-can cursor-pointer text-lg md:text-xl" onClick={this.handleDeleteClick}></i>
                    </div>
                </div>
            </>
        )
    }
}
