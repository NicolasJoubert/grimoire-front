function NoteLinks({ title, noteId }) {
  const handleClick = () => {
    console.log('cliqué sur' + noteId);
  };

  return (
    <div
      className='text-gray-900 mb-0 cursor-pointer hover:underline pl-4'
      onClick={handleClick}
    >
      <span> {title}</span>
    </div>
  );
}

export default NoteLinks;
