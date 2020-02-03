import React, {Component} from 'react';
import './FoldersList.css';
import Folder from '../Folder/Folder';
import NotefulContext from '../contexts/NotefulContext';
import NotesError from '../ErrorBoundary/NotesError';
import PropTypes from 'prop-types';

class FoldersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folders: [], 
        }
    }

    static contextType = NotefulContext;

    static defaultProps = {
        folders: [],
        history: {
            push: () => {}
        }
    }

    static propTypes = {
        folders: PropTypes.arrayOf(
            PropTypes.object
        ).isRequired, 
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired
    }

    getFolders() {
        this.setState({
            folders: this.props.folders,
        })
    }

    componentDidMount() {
        this.getFolders();
    }

    handleGoBack = () => {
        this.context.selectedFolder = null;
        this.context.selectedNote = null;
        this.props.history.push('/');
    }

    handleAddFolder = () => {
        this.props.history.push('/addfolder');
    }

    render() {
        let {folders, notes, selectedFolder, selectedNote} = this.context;
        let folderName = null;
        
        //when a folder is selected: load only selected folder for rendering
        //when a folder is selected, mark that folder but render all
        if(selectedFolder) {
            //folders = folders.filter(folder => (folder.id === selectedFolder) );
            const folder = folders.find(folder => (folder.id === selectedFolder) );
            folderName = folder.name;
        }

        //when a note is selected: load only the folder name and GoBack button
        if(selectedNote) {
            const note = notes.find(note => note.id === selectedNote);
            const folder = folders.find(folder => folder.id === note.folderId);
            folderName = folder.name;
            folders = [];
        }
        
        return(
            <NotesError>
                <div className="foldersList">
                    
                    {/* render folders */}
                    {(folders) && 
                        folders.map( (folder) => <Folder key={folder.id} folder={folder}/> ) }

                    {/* render Add folder button */}
                    {(folders.length > 1) && 
                        <button
                            className="add-button" 
                            type="button" 
                            onClick={ this.handleAddFolder }
                            >Add folder</button>}

                    {/* mark the selected folder as selected */}
                    {folders.length === 0  && 
                        <div>
                            <button type="button" 
                                onClick={ this.handleGoBack } 
                                >Go Back</button> 
                            <h3>{folderName}</h3>
                        </div> }
                </div>
            </NotesError>
        );
    }
}

export default FoldersList;