import React, { Component, createRef } from 'react'
import NotesContext from '../context/notes/NotesContext'
import NotesItems from './NotesItems'
import AddNote from './AddNote'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Alert from '@mui/material/Alert';
import { withRouter } from 'react-router-dom';
class UserNotes extends Component {
    static contextType = NotesContext
    notes = this.context
    getNotes = this.context
    editNote = this.context
    alertState = this.context
    constructor(props) {
        super(props);
        this.state = { open: false, updateNote: { id: "", etitle: "", edescription: "", etag: "" }, alert: false, closeBtnState: false}
        this.ref = createRef(null);
        this.refClose = createRef(null);
    }
    componentDidMount() {
        if(localStorage.getItem('token')){
            this.context.getNotes();
        }
        else{
            this.props.history.push('/login');
        }
    }
    updateNotes = (currentnote) => {
        this.ref.current.click();
        this.setState({ updateNote: { id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag }, alert: true, closeBtnState: true });
    }

    handleCloseButton = () => {
        this.setState({ open: false})
    }
    handleUpdatedInp = (e) => {
        this.setState({ updateNote: { ...this.state.updateNote, [e.target.name]: e.target.value } ,closeBtnState: false}); // ...this.state.updateNote means keep the object defined earlier{etitle:old_values,edescription:old_values,etag:old_values} and further part tells to overwrite it
    }

    handleUpdateBtn = (e) => {
        this.context.editNote(this.state.updateNote.id, this.state.updateNote.etitle, this.state.updateNote.edescription, this.state.updateNote.etag);
        this.refClose.current.click();
        setTimeout(() => {
            this.setState({ alert: false });
        }, 2000);
    }

    render() {
        return (
            <>
                <div className="bg-gradient-to-tr from-blue-400 via-purple-400 to-yellow-400 pt-[3rem] pb-8">
                    {
                        // Alert for the edited note
                        this.state.alert && !this.state.closeBtnState && (<Alert severity="success" variant='filled' className='-mt-14'>
                            <p className='text-lg'>Updated a note successfully :)</p>
                        </Alert>)
                    }
                    {
                        // Alert for the deleted note
                        this.context.alertState && (<Alert severity="success" variant='filled' className='-mt-14'>
                            <p className='text-lg'>Deleted a note successfully :)</p>
                        </Alert>
                        )
                    }
 
                    <AddNote />

                    <React.Fragment>
                        <Button variant="outlined" color="neutral" ref={this.ref} onClick={() => this.setState({ open: true })} style={{ display: 'none' }}>
                            Open modal
                        </Button>
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-desc"
                            open={this.state.open}
                            onClose={() => this.setState({ open: false })}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Sheet
                                sx={{
                                    maxWidth: 500,
                                    borderRadius: 'md',
                                    p: 3,
                                    boxShadow: 'lg',
                                }}
                            >
                                <ModalClose variant="plain" sx={{ m: 1 }} />
                                <Typography
                                    component="h2"
                                    id="modal-title"
                                    level="h4"
                                    textColor="inherit"
                                    // fontWeight="lg"
                                    mb={1}
                                >
                                    <p className='text-xl font-bold'>EDIT NOTE</p>
                                    <hr className='border-2 border-gray-300' />
                                </Typography>
                                {/* <Typography id="modal-desc" textColor="text.tertiary"> */}
                                <form id="editContainer" className='flex flex-col w-72 text-sm h-1/2 md:w-[22rem] md:text-base space-y-2 bg-white'>
                                    <span className='text-base font-bold md:text-lg'>Title</span>
                                    <input type="text" name='etitle' className='border-2 border-black outline-none p-1.5 rounded-xl' value={this.state.updateNote.etitle} onChange={this.handleUpdatedInp} minLength={3} required />
                                    <span className='text-base font-bold md:text-lg'>Description</span>
                                    <input type="text" name='edescription' className='border-2 border-black outline-none p-1.5 rounded-xl' value={this.state.updateNote.edescription} onChange={this.handleUpdatedInp} minLength={6} required />
                                    <span className='text-base font-bold md:text-lg'>Tag</span>
                                    <input type="text" name='etag' className='border-2 border-black outline-none p-1.5 rounded-xl' value={this.state.updateNote.etag} onChange={this.handleUpdatedInp} />
                                </form>
                                <div id="buttons" className='space-x-5 flex justify-end py-3'>
                                    <button className='py-1 bg-gray-500 w-14 text-sm md:w-20 md:text-base rounded-md text-white' id='closeBtn' ref={this.refClose} onClick={this.handleCloseButton}>Close</button>
                                    <button className='py-2 px-1 md:px-0.5 bg-blue-500 w-24 text-sm md:w-24 rounded-md text-white disabled:opacity-40' disabled={this.state.updateNote.etitle.length < 3 || this.state.updateNote.edescription.length < 6} onClick={this.handleUpdateBtn}>Update Now</button>
                                </div>
                                {/* </Typography> */}
                            </Sheet>
                        </Modal>
                    </React.Fragment>

                    {
                        this.context.notes.length === 0 ? (<div className='text-xl font-bold text-center mt-10'>
                            <p>NO NOTES TO DISPLAY :(</p>
                        </div>) : (<div>
                            <center><h2 className='text-xl md:text-2xl lg:text-3xl text-center my-8 w-48 py-1.5 rounded-xl bg-cyan-500 text-white'>Your Notes</h2></center>
                            <div id="NotesOuterContainer" className='flex items-center justify-center'>
                                <div id="NotesContainer" className='w-8/12 md:w-11/12 xl:px-0.5 p-3 flex items-center justify-evenly flex-wrap'>
                                    {
                                        this.context.notes.map((note) => {
                                            return (
                                                <NotesItems key={note._id} note={note} updateNotes={this.updateNotes} />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>)
                    }

                </div>
            </>
        )
    }
}
export default withRouter(UserNotes)