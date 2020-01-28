import React, {Component} from 'react';

class NoteDetails extends Component {

    

    render() {
        const note = this.props.note;
        console.log(`note: ${note}`)

        return(
            <div className="noteDetails">
                <h4>
                    {note.name}
                </h4>                
                <p>Date modified: {note.modified}</p>
                <p>{note.content}</p>
            </div>
        );
    }
}

export default NoteDetails;