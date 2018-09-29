const fs = require('fs');

var fetchNotes = () => {
    try {
        
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString); 
        
    } catch (e) {
        return [];
        
    }
};
 
var saveNotes = (notes) => {

    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNotes = (title, body) => {
    var notes = fetchNotes();
    
    var note = {
        title : title,
        body : body
    }

   var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note; 
        }

};

var getAll = () =>{
    var notes = fetchNotes();
    return notes;

}

var getNote = (title) =>{
    var notes = fetchNotes();
    var filteredNote = notes.filter((note) => note.title === title);
    if (filteredNote.length === 1) {
        return filteredNote[0];
    }
    else {
        return "No records exsist with given title name";;
    }    
}

var removeNote = (title) =>{
    var notes = fetchNotes();
    var removeNotes = notes.filter((note) => note.title !== title);
    saveNotes(removeNotes);
    if (notes.length === removeNotes.length) {
        return "No records exsist with given title name";
    }
    else {
        return "Note was successfully removed";
    }

}
module.exports={
     addNotes,
     getAll,
     getNote,
     removeNote

}