import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import './Folder.css';
import PropType from 'prop-types';

class Folder extends Component {

    static defaultProps = {
        folder: {},
    }

    static propTypes = {
        folder: PropType.object.isRequired,
    }

    handleSelectFolder = (id) => {
        this.props.onSelectFolder(id)
    }

    render() {
        const folder = this.props.folder;
        return(
            <NavLink 
                className="folder" 
                to={`/folder/${folder.id}`} 
                onClick={() => this.handleSelectFolder(folder.id)} 
                activeClassName="selected" >{folder.name}</NavLink>
        );
    }
}

export default withRouter(Folder);