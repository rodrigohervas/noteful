import React, {Component} from 'react';
import NotefulContext from '../contexts/NotefulContext';

class NoteDetails extends Component {

    static contextType = NotefulContext;

    render() {
        const {notes, selectedNote} = this.context;
        const note = notes.find( note => note.id === selectedNote);
        
        return(
            <div className="noteDetails">
                {note &&  
                    <>    
                        <h4>
                            {note.name}
                        </h4>                
                        <p>Date modified: {note.modified}</p>
                        <p>{note.content}</p>
                    </> }
            </div>
        );
    }
}

export default NoteDetails;