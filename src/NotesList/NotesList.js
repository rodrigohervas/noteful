import React, {Component} from 'react';
import Note from '../Note/Note';
import NotefulContext from '../contexts/NotefulContext';

class NotesList extends Component {

    static contextType = NotefulContext;

    render() {

        const notes = this.context.notes;
        let selectedNotes = this.context.selectedFolder 
                                    ? notes.filter(note => note.folderId === this.context.selectedFolder) 
                                    : notes;
        
        if(this.context.selectedNote) {
            selectedNotes = notes.filter(note => note.id === this.context.selectedNote) 
        }
        
        return(
            <div className="notesList">
                {selectedNotes.map( (note) => <Note key={note.id} note={note} />)}

                {/* {selectedNotes && 
                        selectedNotes.map( (note) => <Note key={note.id} note={note} /> ) 
                }

                {!selectedNotes &&
                        selectedNotes.map( (note) => <Note key={note.id} note={note} /> )
                } */}

                <button type="button">Add Note</button>
            </div>
        );
    }
}

export default NotesList;