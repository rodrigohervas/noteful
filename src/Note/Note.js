import React, {Component} from 'react';
import './Note.css';
import {Link} from 'react-router-dom';
import config from '../config/config';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';


class Note extends Component {

    static defaultProps = {
        note: {}, 
        history: {
            push: () => {},
        }
    }

    static propTypes = {
        note: PropTypes.object.isRequired, 
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired
    }

    handleDelete = (id) => {
        const url = `${config.REACT_APP_NOTES_URL}/${id}`;
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
            .then( () => {
                this.props.history.push('/');
                this.props.onDeleteNote(id);
            })
            .catch(error => {
                console.error(error);
            })
    }

    handleSelectNote = (id) => {
        this.props.onSelectNote(id);
    }

    render() {

        let note = this.props.note;

        return(
            <div className="note">
                {!this.props.selectedNote && 
                <>
                <h4>
                    <Link 
                        className="note-header"
                        to={`/note/${note.id}`} 
                        onClick={() => this.handleSelectNote(note.id)} > {note.name} </Link>
                </h4>
                <p>Date modified: {note.date_modified}</p>
                <button onClick={() => this.handleDelete(note.id)} >Delete</button>
                </>
                }
                
                {this.props.selectedNote &&  
                    <>    
                        <h4 className="note-header">{note.name}</h4>                
                        <p>Date modified: {note.date_modified}</p>
                        <button onClick={() => this.handleDelete(note.id)} >Delete</button>
                        <p className="note-content">{note.content}</p>
                    </> }

            </div>
        );
    }
}

export default withRouter(Note);