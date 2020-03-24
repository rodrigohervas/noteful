import React, {useEffect, useState} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav/Nav';
import FoldersList from './FoldersList/FoldersList';
import NotesList from './NotesList/NotesList';
import config from './config/config';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotesError from './ErrorBoundary/NotesError';


function App() {

  const [notes, setNotes] = useState([])
  const [folders, setFolders] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [error, setError] = useState(null)

  function getData(url, callBackFunction) {
    fetch(url, {
      method: 'GET',
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      callBackFunction(data)
      setError(null)
    })
    .catch(error => setError(error))
  }

  useEffect( () => {
    //do 2 fetch actions to get folders and notes
    getData(config.REACT_APP_FOLDERS_URL, setFolders)
    getData(config.REACT_APP_NOTES_URL, setNotes)
  }, [])
  
  //update state deleting the new folder
  const handleDeleteNote = (id) => {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  //update state adding the new folder
  const handleAddFolder = (folder) => {
    const newFolders = [...folders, folder];
    setFolders(newFolders);
  }

  const handleSelectFolder = (id) => {
    setSelectedFolder(id)
  }

  const handleSelectNote = (id) => {
    setSelectedNote(id)
  }

  const handleAddNote = (note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
  }

  const getFolderName = (selectedNote) => {
    const note = notes.filter(note => note.id === selectedNote)[0]
    if(note) {
      return folders.filter(folder => folder.id === note.folder_id)[0].name
    }
    return null
  }
  
  return (
    <div className="App">
      <div className='container'>

        <header>
          <NotesError>
            <Nav onSelectFolder={handleSelectFolder} onSelectNote={handleSelectNote} />
          </NotesError>
        </header>
        <div className="container-main">
          <Switch>
          
            <Route path='/folder/:id' >
              <FoldersList 
                folders={folders}
                onSelectFolder={handleSelectFolder}
              />
            </Route>
            
            <Route exact path='/note/:id' >
              <FoldersList
                 folders={folders} 
                 onSelectFolder={handleSelectFolder}
                 folderName={ selectedNote ? getFolderName(selectedNote) : null }
                 selectedNote={selectedNote} 
              />
            </Route>

            <Route exact path='/' >
              <FoldersList 
                folders={folders}
                onSelectFolder={handleSelectFolder}
              />
            </Route>

          </Switch>
          <main>
            <Switch>
              
              <Route exact path='/' >
                <NotesList 
                  notes={notes} 
                  onDeleteNote={handleDeleteNote} 
                  onSelectNote={handleSelectNote} 
                />
              </Route> 
              
              <Route path='/folder/:id' >
                <NotesList 
                  notes={ notes.filter(note => note.folder_id === selectedFolder) } 
                  onDeleteNote={handleDeleteNote} 
                  onSelectNote={handleSelectNote} 
                /> 
              </Route>

              <Route path='/note/:id' >
                <NotesList 
                  notes={notes.filter( note => note.id === selectedNote)} 
                  onDeleteNote={handleDeleteNote} 
                  onSelectNote={handleSelectNote} 
                  selectedNote={selectedNote} 
                />
              </Route>

              <NotesError>
                
                <Route path='/addfolder' >
                  <AddFolder onAddFolder={handleAddFolder}/>
                </Route>
                
                <Route path='/addnote' >
                  <AddNote folders={folders} onAddNote={handleAddNote} onSelectFolder={handleSelectFolder}  />
                </Route>

              </NotesError>
            
            </Switch>
          </main>
        </div>

      </div>
    </div>
  );
}

export default App;
