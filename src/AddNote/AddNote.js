import React, {Component} from 'react';
import '../AddFolder/AddForm.css';
import config, {generateId} from '../config/config';
import NotefulContext from '../contexts/NotefulContext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PropTypes from 'prop-types';


class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteName: {
                value: '', 
                touched: false, 
            },
            noteContent: {
                value: '', 
                touched: false, 
            },
            folderSelected: {
                value: '', 
                touched: false,
            }
        }
    }

    static defaultProps = {
        history: {
            push: () => {}
        },
    }

    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired, 
        }).isRequired
    }

    static contextType = NotefulContext;

    updateNoteName = (noteName) => {
        this.setState({
            noteName: {
                value: noteName, 
                touched: true,
            }
        });
    }

    updateNoteContent = (noteContent) => {
        this.setState({
            noteContent: {
                value: noteContent, 
                touched: true,
            }
        });
    }

    updateFolderSelected = (folderSelected) => {
        this.setState({
            folderSelected: {
                value: folderSelected, 
                touched: true,
            }
        });
    }

    handleSubmit = (e) => { 
        e.preventDefault();

        const noteName = this.state.noteName.value;        
        const id = generateId(noteName);
        const url = config.notesUrl;
        const date = new Date().toString();
        const note = {
            id: id, 
            name: noteName, 
            modified: date,
            folderId: this.state.folderSelected.value,
            content: this.state.noteContent.value
        }
        const options = { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
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
                this.context.addNote(data);
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
            })

    }

    validateNoteName = () => {
        const noteName = this.state.noteName.value.trim();
        if(noteName.length === 0) {
            return 'The name is required';
        }
    }

    validateNoteContent = () => {
        const noteContent = this.state.noteContent.value.trim();
        if(noteContent.length === 0) {
            return 'The content is required';
        }
    }

    validateFolderSelected = () => {
        const folderSelected = this.state.folderSelected.value.trim();
        if(folderSelected.length === 0) {
            return 'A folder is required'
        }
    }

    render() {

        const folders = this.context.folders;

        const options = folders.map( (folder) => 
                            <option key={folder.id} value={folder.id}> {folder.name} </option> );
        
        return(
            <form 
                name="addNoteForm" 
                onSubmit={ (e) => this.handleSubmit(e) } 
                className="add-note-form">

                <h2>Add Note</h2> 
                
                <div className="form-group">
                    <label htmlFor="noteName"> Name: </label>
                    <input 
                        type="text" 
                        name="noteName" 
                        id="noteName"
                        onChange={ e => this.updateNoteName(e.target.value) } />
                    {this.state.noteName.touched && 
                                            <ErrorMessage message={this.validateNoteName()} /> }
                </div>

                <div className="form-group">
                    <label htmlFor="noteContent"> Content: </label>
                    <textarea 
                        name="noteContent" 
                        id="noteContent"
                        onChange={ e => this.updateNoteContent(e.target.value) } />
                    {this.state.noteContent.touched && 
                                            <ErrorMessage message={this.validateNoteContent()} /> }
                </div>

                <div className="form-group">
                    <label htmlFor="folderSelected"> Folder: </label>
                    <select  
                        name="folderSelected"
                        id="folderSelected" 
                        onChange={ e => this.updateFolderSelected(e.target.value) } >
                        <option>Select a folder</option>
                        { options }
                    </select>
                    {this.state.folderSelected.touched && 
                                            <ErrorMessage message={this.validateFolderSelected()} /> }
                </div>
                
                <div className="button-group">
                    <button type="reset" className="form-button">
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="form-button"
                        disabled={ 
                            this.validateNoteName() || 
                            this.validateNoteContent() || 
                            this.validateFolderSelected() } >
                        Save
                    </button>
                </div>

            </form>
        );
    }
}

export default AddNote;