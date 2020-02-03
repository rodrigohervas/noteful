import React, {Component} from 'react';
import Note from '../Note/Note';
import NotefulContext from '../contexts/NotefulContext';
import NotesError from '../ErrorBoundary/NotesError';
import PropTypes from 'prop-types';
import './NotesList.css';

class NotesList extends Component {

    static contextType = NotefulContext;

    static defaultProps = {
        history: {
            push: () => {}, 
        }
    }

    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired, 
        }).isRequired, 
    }

    handleAddNote = () => {
        this.props.history.push("/addnote");
    }

    render() {

        //if a folder was selected: get only notes for the selectedFolder
        //if not, get all notes
        const notes = this.context.notes;
        let selectedNotes = this.context.selectedFolder 
                                    ? notes.filter(note => note.folderId === this.context.selectedFolder) 
                                    : notes;
        
        //get only a selectedNote
        if(this.context.selectedNote) {
            selectedNotes = notes.filter(note => note.id === this.context.selectedNote) 
        }
        
        return(
            <NotesError>
                <div className="notesList">
                    {selectedNotes.map( (note) => <Note key={note.id} note={note} />)}

                    <button 
                    className="add-button" 
                        type="button" 
                        onClick={this.handleAddNote}
                    >Add Note</button>
                </div>
            </NotesError>
        );
    }
}

export default NotesList;