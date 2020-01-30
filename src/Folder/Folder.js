import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Folder.css';
import NotefulContext from '../contexts/NotefulContext';

class Folder extends Component {

    static contextType = NotefulContext;

    handleClick = (id) => {
        this.context.selectedFolder = id;
        //console.log(`folderId: ${id}`)
    }

    render() {
        const folder = this.props.folder;
        return(
            <NavLink 
                to={`/folder/${folder.id}`} 
                onClick={() => this.handleClick(folder.id)} >{folder.name}</NavLink>
        );
    }
}

export default Folder;