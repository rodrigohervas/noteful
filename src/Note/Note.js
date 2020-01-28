import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Note extends Component {

    render() {
        const note = this.props.note;

        return(
            <div className="note">
                <h4>
                    <Link to={`/note/${note.id}`}>{note.name}</Link>
                </h4>
                <p>Date modified: {note.modified}</p>
            </div>
        );
    }
}

export default Note;