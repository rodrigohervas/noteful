import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav/Nav';
import FoldersList from './FoldersList/FoldersList';
import data from './dummy-store';
import NotesList from './NotesList/NotesList';
import NoteDetails from './NoteDetails/NoteDetails';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        notes: data.notes, //notes: [],
        folders: data.folders //folders: []
    }
  }

  componentDidMount() {
      this.setState({
        notes: data.notes, 
        folders: data.folders,
    })
  }

  getNote(id) {
    return this.state.notes.find(note => note.id === id);
  }

  render() {

    const {notes, folders} = this.state;

    return (
      <div className="App">
        <div className='container'>
          
          <header>
            <Nav />
          </header>
          <div className="container-main">
            <Switch>
              <Route exact path='/note/:noteId' render={ (routeProps) => {
                                                            const noteId = routeProps.match.params.noteId;
                                                            const folderId = this.getNote(noteId).folderId;
                                                            const folderName = this.state.folders.find(folder => folder.id === folderId).name;
                                                            return <FoldersList {...routeProps} folderName={folderName}/> 
                                                          } 
                                                          }/>
              <Route path='/' render={ () => <FoldersList folders={folders}/> } />
            </Switch>
            <main>
              <Switch>
                <Route exact path='/' render={ () => <NotesList notes={notes}/> } />
                <Route path='/folder/:folderId' render={ (routeProps) => <NotesList notes={notes} folderId={routeProps.match.params.folderId}/> } />
                <Route path='/note/:noteId' render={ (routeProps) => <NoteDetails note={this.getNote(routeProps.match.params.noteId)} noteId={routeProps.match.params.noteId} /> } />
              </Switch>
            </main>
          </div>
          
  
          </div>
      </div>
    );
  }
}

export default App;
