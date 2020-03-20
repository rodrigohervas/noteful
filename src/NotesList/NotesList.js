import React, {Component} from 'react';
import Note from '../Note/Note';
import NotefulContext from '../contexts/NotefulContext';
import NotesError from '../ErrorBoundary/NotesError';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
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

        const { notes, onDeleteNote, onSelectNote, selectedNote } = this.props;
        
        return(
            <NotesError>
                <div className="notesList">
                    {notes.map( (note) => <Note key={note.id} 
                                                note={note} 
                                                onDeleteNote={onDeleteNote} 
                                                onSelectNote={onSelectNote}
                                                selectedNote={selectedNote} />)}

                    <button 
                        className="add-button" 
                        type="button" 
                        onClick={this.handleAddNote} >
                        Add Note
                    </button>
                </div>
            </NotesError>
        );
    }
}

//export default NotesList;
export default withRouter(NotesList);