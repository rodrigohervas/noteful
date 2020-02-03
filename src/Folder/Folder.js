import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Folder.css';
import NotefulContext from '../contexts/NotefulContext';
import PropType from 'prop-types';

class Folder extends Component {

    static contextType = NotefulContext;

    static defaultProps = {
        folder: {},
    }

    static propTypes = {
        folder: PropType.object.isRequired,
    }

    handleClick = (id) => {
        this.context.selectedFolder = id;
    }

    render() {
        const folder = this.props.folder;
        return(
            <NavLink 
                className="folder" 
                to={`/folder/${folder.id}`} 
                onClick={() => this.handleClick(folder.id)} 
                activeClassName="selected" >{folder.name}</NavLink>
        );
    }
}

export default Folder;