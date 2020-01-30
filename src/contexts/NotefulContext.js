import React from 'react';

const NotefulContext = React.createContext({
    notes: [], 
    folders: [], 
    selectedFolder: null, 
    selectedNote: null, 
    deleteNote: () => {},
    // addFolder: () => {},
    // deleteFolder: () => {},
});

export default NotefulContext;