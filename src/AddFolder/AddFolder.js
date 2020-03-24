import React, {Component} from 'react';
import './AddForm.css';
import config from '../config/config';
import NotefulContext from '../contexts/NotefulContext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'


class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folderName: {
                value: '', 
                touched: false, 
            },
        }
    }

    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    static contextType = NotefulContext;

    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired, 
        }).isRequired
    }

    updateFolderName = (folderName) => {
        this.setState({
            folderName: {
                value: folderName, 
                touched: true,
            }
        });
    }

    handleSubmit = (e) => { 
        e.preventDefault();

        const folderName = this.state.folderName.value; 
        const url = config.REACT_APP_FOLDERS_URL;
        const folder = {
            name: folderName
        }
        const options = { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        };

        fetch(url, options)
            .then(response => {
                if(!response.ok) {
                    return response.json()
                        .then( error => {
                            throw error})
                }
                return response.json()
            })
            .then(data => {
                //this.props.onAddFolder(data);
                this.props.onAddFolder(data)
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
            })
    }

    validateFolderName = () => {
        const folderName = this.state.folderName.value.trim();
        if(folderName.length === 0) {
            return 'The folder name is required';
        }
    }

    handleCancel = () => {
        this.props.history.push('/');
    }

    render() {
        
        return(
            <form 
                name="addFolderForm" 
                onSubmit={ (e) => this.handleSubmit(e) } 
                className="add-folder-form">

                <h2>Add Folder</h2> 
                
                <div className="form-group">
                    <label htmlFor="name"> Folder Name: </label>
                    <input 
                        type="text" 
                        name="folderName" 
                        id="folderName" 
                        aria-label="folder name" 
                        aria-required="true" 
                        onChange={ e => this.updateFolderName(e.target.value) } 
                    />
                    {this.state.folderName.touched && 
                                            <ErrorMessage message={this.validateFolderName()} /> }
                </div>
                
                <div className="button-group">
                    <button onClick={this.handleCancel} type="reset" className="form-button">
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="form-button"
                        disabled={ this.validateFolderName() }
                         >
                        Save
                    </button>
                </div>

            </form>
        );
    }
}

export default withRouter(AddFolder);