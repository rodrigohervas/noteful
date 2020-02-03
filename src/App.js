import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav/Nav';
import FoldersList from './FoldersList/FoldersList';
import NotesList from './NotesList/NotesList';
import NotefulContext from './contexts/NotefulContext';
import config from './config/config';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotesError from './ErrorBoundary/NotesError';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        folders: []
    }
  }

  getData(url, callBackFunction) {
    fetch(url, {
      method: 'GET',
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => callBackFunction(data))
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

  //update state deleting the new folder
  handleDeleteNote = (id) => {
    const newNotes = this.state.notes.filter(note => note.id !== id);
    this.setNotes(newNotes);
  }

  //update state adding the new folder
  handleAddFolder = (folder) => {
    const folders = this.state.folders;
    const newFolders = [...folders, folder];
    this.setFolders(newFolders);
  }

  handleAddNote = (note) => {
    const notes = this.state.notes;
    const newNotes = [...notes, note];
    this.setNotes(newNotes);
  }

  getFolderByNoteId = (noteId) => {
    console.log('noteId: ', noteId)
    const note = this.state.notes.find(note => note.id === noteId);
    const folder = this.state.folders.find(folder => folder.id === note.folderId);
    console.log('found folder: ', folder)
    return folder;
  }

  render() {
    //load state values into a contextValue object, to pass it in the context provider
    const contextValue = {
      notes: this.state.notes, 
      folders: this.state.folders, 
      deleteNote: this.handleDeleteNote, 
      addFolder: this.handleAddFolder, 
      addNote: this.handleAddNote
    };

    return (
      <div className="App">
        <div className='container'>


          <NotefulContext.Provider value={contextValue}>
            <header>
              <NotesError>
                <Nav />
              </NotesError>
            </header>
            <div className="container-main">
              <Switch>

              {/* <Route 
                    path='/folder/:folderId' 
                    render={(props) => <FoldersList props={props} folders={this.state.folders} /> } 
                    test={'test folders'} /> */}
              
              <Route 
                path='/folder/:folderId' 
                component={FoldersList} />

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
                    component={NotesList} >
                  </Route>

                  {/* Route passing props and noteId and folder
                  <Route 
                    path='/note/:noteId'
                    render={ (props, notes) => <NotesList 
                                              {...props} 
                                              noteId={props.match.params.noteId} 
                                              folder={this.getFolderByNoteId(props.match.params.noteId)} /> }  
                    /> */}

                  <NotesError>
                    <Route 
                      path='/addfolder'
                      component={AddFolder} />

                    <Route 
                      path='/addnote'
                      component={AddNote} />  
                  </NotesError>
                
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
