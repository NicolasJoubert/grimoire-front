import { useDispatch } from 'react-redux';
import { replaceCurrentNote } from '../reducers/currentNote';

function NoteLinks({ title, noteId }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(replaceCurrentNote(noteId));
    console.log('cliqué sur' + noteId);
  };

  return (
    <div
      className='text-gray-900 mb-0 cursor-pointer hover:underline pl-4'
      onClick={handleClick}
    >
      <span>{title}</span>
    </div>
  );
}

export default NoteLinks;
