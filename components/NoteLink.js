import { useDispatch, useSelector } from 'react-redux';
import { replaceCurrentNote } from '../reducers/currentNote';

function NoteLinks({ title, noteId, isCurrent, stylePage }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(replaceCurrentNote(noteId));
    // setSearchBarIsVisible(false)
    console.log('cliqué sur' + noteId);
  };

  const baseStyle =
    'cursor-pointer transition duration-300 hover:text-lightPurple ease-in-out rounded-md text-darkPurple w-auto ml-1 mr-1 pl-2';

  const styleAccordingToThePage = {
    sidebar: isCurrent && 'bg-darkPurple text-white w-auto',
  };

  return (
    <div
      className={`${baseStyle} ${styleAccordingToThePage[stylePage]}`}
      onClick={handleClick}
    >
      <span>{title}</span>
    </div>
  );
}

export default NoteLinks;
