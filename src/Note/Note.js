import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NotefulContext from '../contexts/NotefulContext';
import config from '../config/config';


class Note extends Component {

    static contextType = NotefulContext;

    handleDelete = (id) => {
        const url = `${config.notesUrl}/${id}`;
        const options = { 
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
              }, 
        };

        fetch(url, options)
            .then(response => {
                if(!response.ok) {
                    return response.json()
                            .then( error => {
                                throw error})
                }
                return response.json()
            })
            .then(data => {
                //load the id into the context deleteNote function, to be able to use in App.js
                this.context.deleteNote(id);
                this.context.selectedNote = null;
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
            })
    }

    handleSelectedNote = (note) => {
        this.context.selectedNote = note.id;
    }

    render() {

        let note = this.props.note;
        
        //if note is selected, render only that note
        if(this.context.selectedNote) {
            note = this.context.notes.find(note => note.id === this.context.selectedNote);
        }
        
        return(
            <div className="note">
                {!this.context.selectedNote && 
                <>
                <h4>
                    <Link 
                        to={`/note/${note.id}`} 
                        onClick={() => this.handleSelectedNote(note)} >{note.name}</Link>
                </h4>
                <p>Date modified: {note.modified}</p>
                <button onClick={() => this.handleDelete(note.id)} >Delete</button>
                </>
                }
                
                {this.context.selectedNote &&  
                    <>    
                        <h4>{note.name}</h4>                
                        <p>Date modified: {note.modified}</p>
                        <button onClick={() => this.handleDelete(note.id)} >Delete</button>
                        <p>{note.content}</p>
                    </> }

            </div>
        );
    }
}

export default Note;