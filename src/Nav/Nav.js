import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';
import NotefulContext from '../contexts/NotefulContext';

class Nav extends Component {

    static contextType = NotefulContext;

    clearSelectedFolder = () => {
        this.context.selectedFolder = null;
        this.context.selectedNote = null;
    }

    render() {

        return(
            <div className="nav">
                <NavLink onClick={this.clearSelectedFolder} to='/'><h1>Noteful</h1></NavLink>            
            </div>
        );
    }
}

export default Nav;