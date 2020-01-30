import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav/Nav';
import FoldersList from './FoldersList/FoldersList';
// import data from './dummy-store';
import NotesList from './NotesList/NotesList';
import Note from './Note/Note';
import NotefulContext from './contexts/NotefulContext';
import config from './config/config';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        folders: []
    }
  }

  getData(url, setFunction) {
    fetch(url, {
      method: 'GET',
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => setFunction(data))
    .catch(error => this.setState({ error }))
  }

  componentDidMount() {
      //do 2 fetch actions to get folders and notes
      this.getData(config.foldersUrl, this.setFolders)
      this.getData(config.notesUrl, this.setNotes)
  }

  setNotes = (notes) => {
    this.setState({
      notes: notes, 
    })
  }

  setFolders = (folders) => {
    this.setState({
      folders: folders,
    })
  }

  handleDeleteNote = (id) => {
    const newNotes = this.state.notes.filter(note => note.id !== id);
    this.setNotes(newNotes);
    //this.context.selectedNote = null;
    //this.props.history.push('/');
  }

  render() {
    //load state values into a contextValue object, to pass it in the provider
    const contextValue = {
      notes: this.state.notes, 
      folders: this.state.folders, 
      deleteNote: this.handleDeleteNote, 
    };

    return (
      <div className="App">
        <div className='container'>
          <NotefulContext.Provider value={contextValue}>
            <header>
              <Nav />
            </header>
            <div className="container-main">
              <Switch>

                <Route 
                  exact 
                  path='/note/:noteId' 
                  component={FoldersList} />

                <Route 
                  path='/' 
                  component={FoldersList} />

              </Switch>
              <main>
                <Switch>
                  
                  <Route 
                    exact 
                    path='/' 
                    component={NotesList} />
                  
                  <Route 
                    path='/folder/:folderId' 
                    component={NotesList} />

                  <Route 
                    path='/note/:noteId' 
                    component={NotesList} />
                
                </Switch>
              </main>
            </div>
          </NotefulContext.Provider>
          
        </div>
      </div>
    );
  }
}

export default App;
