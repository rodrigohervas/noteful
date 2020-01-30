import React, {Component} from 'react';
import './FoldersList.css';
import Folder from '../Folder/Folder';
import NotefulContext from '../contexts/NotefulContext';

class FoldersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folders: [], 
        }
    }

    static contextType = NotefulContext;

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

    render() {
        let {folders, selectedFolder} = this.context;
        
        //when a folder is selected: load only selected folders for rendering
        if(selectedFolder) {
            folders = folders.filter(folder => (folder.id === selectedFolder) );
        }
        
        return(
            <div className="foldersList">
                
                {/* render folders */}
                {(folders) && 
                    folders.map( (folder) => <Folder key={folder.id} folder={folder}/> ) }

                {/* render Add folder button */}
                {(folders.length > 1) && <button type="button">Add folder</button>}
                 
                {/* mark the selected folder as selected!!! */}
                {folders.length <= 1  && 
                    <div>
                        <button type="button" onClick={ this.handleGoBack } >Go Back</button> 
                        <h3>{folders.folderName}</h3>
                    </div> }
            </div>
        );
    }
}

export default FoldersList;