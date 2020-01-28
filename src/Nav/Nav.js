import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';

class Nav extends Component {

    render() {
        return(
            <div className="nav">
                <NavLink to='/'><h1>Noteful</h1></NavLink>            
            </div>
        );
    }
}

export default Nav;