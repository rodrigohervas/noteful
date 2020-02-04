import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';
import NotefulContext from '../contexts/NotefulContext';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inFocus: false,
        }
        this.inFocus = React.createRef();
    }

    static contextType = NotefulContext;

    clearSelectedFolder = () => {
        this.context.selectedFolder = null;
        this.context.selectedNote = null;
    }

    componentWillUpdate(prevState, state) {
        if(prevState.inFocus !== state.inFocus) {
            this.inFocus.current.focus();
        }
    }

    render() {

        return(
            <div className="nav">
                               
                <NavLink ref={this.inFocus} onClick={this.clearSelectedFolder} to='/'><h1>Noteful</h1></NavLink>
                
            </div>
        );
    }
}

export default Nav;