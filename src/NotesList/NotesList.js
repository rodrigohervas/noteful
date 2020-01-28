import React, {Component} from 'react';
import Note from '../Note/Note';

class NotesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [], 
            folderId: null
        }
    }

    componentDidMount() {
        this.setState({
            notes: this.props.notes, 
            folderId: this.props.folderId
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.folderId !== this.props.folderId) {
            this.setState({
                notes: this.props.notes, 
                folderId: this.props.folderId
            });
        }
    }

    renderNotes() {

        const notes = this.state.notes;
        
        if(this.state.folderId) {
            const list = notes.filter( note => note.folderId === this.state.folderId );
            return list.map( (note) => <Note key={note.id} note={note} /> );
        }
        else {
            return this.state.notes.map( (note) => <Note key={note.id} note={note} /> );
        }
    }

    render() {

        return(
            <div className="notesList">
                {this.renderNotes()}                
                <button type="button">Add Note</button>
            </div>
        );
    }
}

export default NotesList;