import uuidv1 from 'uuid/v1';

export default {
    notesUrl: "http://localhost:9090/notes", 
    foldersUrl: "http://localhost:9090/folders"
}

export function generateId(name) {
    return uuidv1(name);
}