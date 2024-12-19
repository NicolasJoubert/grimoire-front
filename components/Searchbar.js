import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from 'react-icons/tb';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

import NoteLink from './NoteLink';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Searchbar({
  createNote,
  toggleSidebarLeft,
  toggleSidebarRight,
  isSidebarLeftVisible,
  isSidebarRightVisible,
  onOutsideClick,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [fetchedTagNotes, setFetchedTagNotes] = useState([])
  const [tags, setTags] = useState([]);
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  
  const token = useSelector((state) => state.user.value.token);

  /// ****** FONCTIONS ********/////

  //Input value gestion
  const changeInput = (inputValue) => {
    if (inputValue === '') {
      setSearchInput('');
      setSearchedNotes([]);
      setIsSearchResultVisible(false);
      return;
    }

    setSearchInput(inputValue);

    if (!inputValue.includes('#')) { // if no hashtags are in the input, fetch note by title
      fetchNotesByTitle(inputValue)
      searchedNotes.length > 0 ? setIsSearchResultVisible(true) : setIsSearchResultVisible(false)
      return
    } 

    extractTags(inputValue) // first we get the tags in the searchBar
    filterNotesByTags()
    searchedNotes.length > 0 ? setIsSearchResultVisible(true) : setIsSearchResultVisible(false)
  };

  /** Get all words that start with a "#" */
  const extractTags = (input) => {
    const regex = new RegExp('#\\w+', 'g');
        console.log("input", input)
    const matches = input.match(regex);
    console.log("matches", matches)
    
    setTags(matches || []);
}

  /** Recherche des notes par titre */
  const fetchNotesByTitle = async (inputValue) => {
    const response = await fetch(`${backendUrl}/notes/search/${inputValue}/${token}`)
    const data = await response.json()
    data.result && setSearchedNotes(data.notes)
    console.log(data)
    data.notes.length > 0 && setIsSearchResultVisible(true)
  }

  /** Recherche des notes pour un tag */
  const fetchNotesByTag = async (tagValue) => {
    const response = await fetch(`${backendUrl}/tags/notes/${tagValue}/${token}`)
    const data = await response.json()
    if (data.result) {
      setFetchedTagNotes(data.notes)
    } else {
      setFetchedTagNotes([])
    }
  }

  /** Filtrage des notes par tag */
  const filterNotesByTags = async () => {

    let filteredTagNotes = []

    for (let i=0; i < tags.length; i++) {
      fetchNotesByTag(tags[i].slice(1)) // fetch tag without the "#"
      
      if (i === 0) {
          filteredTagNotes.push(...fetchedTagNotes) // si c'est la première recherche, on mets toutes les notes récupérées dans tempNotes
          console.log("filteredTagNotes", filteredTagNotes, "index", i)
      } else {
        const tempNotes = []
        for (let note of fetchedTagNotes) {
          
            if (filteredTagNotes.some(data => data.title === note.title)) {
              tempNotes.push(note) // si la note avait déjà été récupérée, on la conserve
            } 
            filteredTagNotes = tempNotes // on met à jour les filteredNotes avec les notes filtrée lors de la dernière itération
          };
          if (filteredTagNotes.length === 0) return // si le tableau des notes filtrées est vide, inutile de continuer la recherche
      }
      setSearchedNotes(filteredTagNotes)
    }
  }


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


  //noteLink creation liste
  let notes = [];
  if (searchedNotes.length > 0) {
    notes = searchedNotes.map((note, i) => {
      return (
        <button
          onClick={() => setIsSearchResultVisible(false)}
          className='text-left'
        >
          <NoteLink key={i} stylePage="search" title={note.title} noteId={note._id} />
        </button>
      );
    });
  }

  return (
    <div className='text-gray-900 flex flex-row justify-between items-center bg-backgroundColor sticky top-0 py-4'>
      {/* Bouton pour afficher la Sidebar uniquement si elle est cachée */}
      {!isSidebarLeftVisible && (
        <button className='pb-8 pl-4 pr-4 text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out'>
          <TbLayoutSidebarLeftExpandFilled
            size={24}
            onClick={toggleSidebarLeft}
          />
        </button>
      )}
      {/* Bouton pour ajouter un fichier */}
      <button onClick={() => createNote()}>
        <FontAwesomeIcon
          icon={faFileCirclePlus}
          className='p-4 text-darkPurple text-xl hover:text-lightPurple transition duration-300 ease-in-out'
        />
      </button>

      {/* Search */}
      <div className='flex flex-1 flex-col items-center justify-start'>
        <div className='flex flex-col border-b-2 border-darkPurple w-[80%] relative'>
          <input
            onChange={(e) => changeInput(e.target.value)}
            value={searchInput}
            className='text-lg text-gray-900 w-full focus:outline-none bg-backgroundColor'
            placeholder='Trouver une note'
          />
          {/* Résultats de la recherche */}
            
          {isSearchResultVisible && (
          <div
            ref={elementRef}
            className='absolute overflow-y top-14 left-0 w-full max-w-screen-sm  flex flex-col justify-center items-center'
            >
            <div className='w-full max-h-36 overflow-y-scroll flex flex-col bg-white shadow-lg border-2 border-darkPurple rounded-lg p-4'>
              {searchedNotes && notes}
            </div>
          </div>)}
        </div>
        {/* <div className='flex justify-center items-center '>
              {displayedTags}
            </div> */}
        
      </div>

      {/* Bouton pour afficher la Sidebar uniquement si elle est cachée */}
      {!isSidebarRightVisible && (
        <button className='pb-8 pl-4 pr-4 text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out'>
          <TbLayoutSidebarRightExpandFilled
            size={24}
            onClick={toggleSidebarRight}
          />
        </button>
      )}

    </div>
  );
}
