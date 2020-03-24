import React, {Component} from 'react';
import './FoldersList.css';
import Folder from '../Folder/Folder';
import NotefulContext from '../contexts/NotefulContext';
import NotesError from '../ErrorBoundary/NotesError';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

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
        
        const { folders, onSelectFolder, selectedNote, folderName } = this.props
        
        return(
            <NotesError>
                <div className="foldersList">
                    
                    {/* render folders */}
                    {(folders) && !selectedNote && 
                        folders.map( (folder) => <Folder 
                                                    key={folder.id} 
                                                    folder={folder} 
                                                    onSelectFolder={onSelectFolder} />
                                            ) }

                    {/* render Add folder button */}
                    {(folders.length > 1) && !selectedNote && 
                        <button
                            className="add-button" 
                            type="button" 
                            onClick={this.handleAddFolder }
                            >Add folder</button>}

                    {/* render the selected folder name and 'Go Back' button */}
                    {selectedNote  && 
                        <div>
                            <button type="button" 
                                onClick={ this.handleGoBack } 
                                >Go Back</button> 
                            {/* <h3>{ folders.filter(folder => folder.id === selectedFolder).name }</h3> */}
                            <h3>{folderName}</h3>
                        </div> }
                </div>
            </NotesError>
        );
    }
}

export default withRouter(FoldersList);