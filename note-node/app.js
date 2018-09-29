const fs = require ('fs');
const _ = require ('lodash');
const yargs = require ('yargs');

const notes = require('./notes.js')

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

var logNotes = (note) =>{
    console.log('--');
    console.log('title: ' + note.title);
    console.log('Body: ' + note.body);
}

const argv = yargs.
    command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'Display all notes')
    .command('read', 'Read a particular note', {
        title: titleOptions
          
    })
    .command('remove', 'Remove note', {
        title:titleOptions
    })
    .help()
    .argv;

var command = yargs.argv._[0]


if(command === 'add'){
    var note = notes.addNotes(argv.title, argv.body);
    if (note) {
        console.log('Note-created');
        logNotes(note);
    } 
    else {
        console.log('title was already taken'); 
   } 
}
else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`)
    allNotes.forEach((note) => {
        logNotes(note);
    })

}
else if(command === 'remove'){
    console.log(notes.removeNote(argv.title));
}
else if(command === 'read'){
    var readNotes = notes.getNote(argv.title);
    logNotes(readNotes);

}
else{
    console.log('command not reconized');
}









