import { useDispatch } from 'react-redux';
import { replaceCurrentNote } from '../reducers/currentNote';

function NoteLinks({ title, noteId, setSearchBarIsVisible }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(replaceCurrentNote(noteId));
    setSearchBarIsVisible(false)
    console.log('cliqué sur' + noteId);
    
  };

  return (
    <div
      className='text-gray-900 mb-0 cursor-pointer hover:underline hover:text-lightPurple transition duration-300 ease-in-out pl-4'
      onClick={handleClick}
    >
      <span>{title}</span>
    </div>
  );
}

export default NoteLinks;
