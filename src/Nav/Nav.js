import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inFocus: false,
        }
        this.inFocus = React.createRef();
    }

    clearSelectedFolder = () => {
        this.props.onSelectFolder(null);
        this.props.onSelectNote(null);
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