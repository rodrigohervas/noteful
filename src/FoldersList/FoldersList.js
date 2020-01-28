import React, {Component} from 'react';
import './FoldersList.css';
import Folder from '../Folder/Folder';

class FoldersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folders: [], 
        }
    }

    getFolders() {
        this.setState({
            folders: this.props.folders,
        })
    }

    componentDidMount() {
        this.getFolders();
    }

    renderFolders() {
        if(this.props.folders) {
            return this.props.folders.map( (folder) => {
                return <Folder key={folder.id} folder={folder}/>
            });
        }
    }

    render() {
        const folders = this.renderFolders();
        
        return(
            <div className="foldersList">
                {folders}
                {folders && <button type="button">Add folder</button>}
                 
                {
                    !folders && 
                    <div>
                        <button type="button" onClick={ () => this.props.history.goBack() } >Go Back</button> 
                        <h3>{this.props.folderName}</h3>
                    </div>
                }
            </div>
        );
    }
}

export default FoldersList;