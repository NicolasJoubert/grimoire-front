function NoteLinks({ notes }) {
  return (
    <div>
      {notes.map((note) => (
        <p
          className='text-gray-900 mb-0 cursor-pointer hover:underline pl-4'
          onClick={() => console.log('cliqué sur ' + note.id)}
          key={note.id}
        >
          {note.title}
        </p>
      ))}
    </div>
  );
}

export default NoteLinks;
