import { useState, useRef, useEffect } from 'react';
import NoteLink from './NoteLink'
import Image from 'next/image';
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from 'react-icons/tb';
import { useSelector } from 'react-redux';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Searchbar({
  createNote,
  toggleSidebarLeft,
  toggleSidebarRight,
  isSidebarLeftVisible,
  isSidebarRightVisible,
  onOutsideClick

}) {
  const [search, setSearch] = useState('');
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [tag, setTag] = useState([]);
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const token = useSelector((state) => state.user.value.token);
  
  
  //Input value gestion
  const changeInput = (inputValue) => {
    if(inputValue===""){
      setSearch('')
      setSearchedNotes([])
      setIsSearchResultVisible(false)
      return 
    }
    //si dans valeur de l'input il existe le caractere "#"
    if (inputValue.includes('#')) {
      const tabStringInput = inputValue.split(' '); //On crée un tableau a partir de la chaine de caractere avec le separeteur " "
      const tabTag = tabStringInput.filter((el) => el.startsWith('#')); // On filtre que les element qui commence par "#"
      setTag(tabTag); // on et a jour l'etat
      setIsSearchResultVisible(true)
    }

    setSearch(inputValue);
    
    fetch(`${backendUrl}/notes/search/${inputValue}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchedNotes(data);
        if(data.length>0){
          setIsSearchResultVisible(true)
        }
      });
  };

  //gestion du click exterieur ************************/
  const elementRef = useRef(null);
  useEffect(() => {
    // Fonction de gestion du clic
    const handleClickOutside = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setIsSearchResultVisible(onOutsideClick); // Appelle la fonction passée en props
      }
    };

    // Ajoute un écouteur d'événement global
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Nettoie l'écouteur d'événement quand le composant est démonté
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);
 //END gestion du click exterieur ************************/

  


  //HASTAG creation liste 
  let tags = tag.map((hastag, i) => {
    return (
      <div
        key={i}
        className='border-black text-gray-900 bg-lightPurple rounded-lg text-center p-2 max-w-32 mx-2'
      >
        <span>{hastag}</span>
      </div>
    );
  });

  //noteLink creation liste 
  let notes = []
  if(searchedNotes.length > 0){
    notes = searchedNotes.map((note, i) => {
      return <NoteLink key={i} title={note.title} noteId={note._id}/>;
    });
  }


  return (
    <div className='text-gray-900 flex flex-row justify-between justify-items-center bg-backgroundColor sticky top-0 relative py-4'>
      {/* Bouton pour afficher la Sidebar uniquement si elle est cachée */}
      {!isSidebarLeftVisible && (
        <button className='p-4 text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out'>
          <TbLayoutSidebarLeftExpandFilled
            size={24}
            onClick={toggleSidebarLeft}
          />
        </button>
      )}
      <button onClick={() => createNote()} >
        <Image
          src='/assets/icon_new_note.png'
          width={35}
          height={35}
          alt='icon of new folder'
          />
      </button>
          
      <div className='flex justify-end justify-items-end w-[80%] block '>

        <div className='mr-4 flex justify-end justify-items-end border-b-2 border-darkPurple block w-full h-10'>
          <input
            onChange={(e) => changeInput(e.target.value)}
            value={search}
            className='  text-lg border-black text-gray-900 w-full focus:outline-none bg-backgroundColor'
            placeholder='Search'
            
          />
          <button onClick={() => handleSubmit()}>
            <Image
              src='/assets/icon_search.png'
              width={25}
              height={25}
              alt='icon of search'
            />
          </button>
        </div>
        <button onClick={() => handleSubmit()} className=' mt-2'>
          <Image
            src='/assets/icon_filter.png'
            width={40}
            height={40}
            alt='icon of filter'
          />
        </button>
      </div>
      
        {/* Bouton pour afficher la Sidebar uniquement si elle est cachée */}
      {!isSidebarRightVisible && (
        <button className='p-4 text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out'>
          <TbLayoutSidebarRightExpandFilled
            size={24}
            onClick={toggleSidebarRight}
          />
        </button>
      )}

      {isSearchResultVisible && (<div ref={elementRef} className='absolute top-20 left-0 w-full max-w-screen-sm flex flex-col justify-center justify-items-center'>
        <div className='w-full max-w-screen-sm flex flex-row left-1/4'>
          {tags}
        </div>
        <div className='w-full flex flex-col bg-lightPurple rounded-lg p-4 '>
        {searchedNotes && notes}
        </div>
      </div>)}
    </div>
  );
}
