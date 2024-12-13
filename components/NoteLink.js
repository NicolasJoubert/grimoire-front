import { useDispatch, useSelector } from 'react-redux';
import { replaceCurrentNote } from '../reducers/currentNote';

function NoteLinks({ title, noteId, isCurrent, stylePage }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(replaceCurrentNote(noteId));
    console.log('cliqué sur' + noteId);
  };

  // variable pour le style de base dut titre de la note
  const baseStyle =
    'cursor-pointer transition duration-300 hover:text-lightPurple ease-in-out rounded-md text-darkPurple w-auto ml-1 mr-1 pl-2';

  // variable qui permet de dynamiser en fonction de la page
  const styleAccordingToThePage = {
    // nom de la page -> props ensuite pour dynamiser si note courante
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
