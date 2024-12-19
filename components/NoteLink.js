import { useDispatch } from 'react-redux';
import { replaceCurrentNote } from '../reducers/currentNote';

function NoteLinks({ title, noteId, isCurrent, stylePage, isSearch }) {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(replaceCurrentNote(noteId));
    //console.log('cliqué sur' + noteId);
    
  };
  const restrictTitle = () => {
    // restreint la longueur du titre sur les composants sidebar left/right
    if ((stylePage !== 'search') &&
        (stylePage !== 'internal_link') && 
        (stylePage !== 'forwardTitle') &&
        (stylePage !== 'backwardTitle') &&
          title.length > 21){

     return title.substring(0, 21) + "..."
    }
      return title
  }
  // variable pour le style de base dut titre de la note
  const baseStyle =
    'cursor-pointer transition duration-300 hover:text-lightPurple ease-in-out rounded-md text-darkPurple w-auto ml-1 mr-1 pl-2';

  // variable qui permet de dynamiser en fonction de la page
  const styleAccordingToThePage = {
    // nom de la page -> props ensuite pour dynamiser si note courante
    sidebar: isCurrent && 'bg-darkPurple text-white w-auto',
    forwardTitle: 'italic text-xs overflow-y-auto',
    internal_link: 'shadow-md	pb-1 hover:bg-darkPurple hover:text-white w-full mb-2'
  };

  return (
    <div
      className={`${baseStyle} ${styleAccordingToThePage[stylePage]}`}
      onClick={handleClick}
    >
      <span>{restrictTitle()}</span>
    </div>
  );
}

export default NoteLinks;
