import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Folder.css';

class Folder extends Component {

    render() {
        const folder = this.props.folder;
        return(
            <NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink>
        );
    }
}

export default Folder;