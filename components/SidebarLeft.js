import { Popover } from 'antd';
import { useState, useEffect } from 'react';
import NoteLink from './NoteLink.js';
// REDUCER
import { useSelector, useDispatch } from 'react-redux';
import { updateNoteSortingInStore } from '../reducers/user.js';

//ICONS FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faFileCirclePlus,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import ConnectedUser from './ConnectedUser.js';

export default function SidebarLeft({ toggleSidebarLeft, createNote }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [selectFavoris, setFavoris] = useState([]);
  const [titleNotes, setTitleNotes] = useState([]);
  
  // REDUCER

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.value);
  const currentNote = useSelector((state) => state.currentNote.value);
  const isFavorite = useSelector((state) => state.changeStatus.value);
  const modifTitle = useSelector((state) => state.currentNote.title);

  const fetchNotes = async () => {
    try {
      const response = await fetch(backendUrl + `/notes/user/${user.token}`);

      const data = await response.json();

      if (data.result) {          
        setTitleNotes(data.notes);
        user.noteSorting === "alpha-asc" && sortNotesAlphabetical("asc") // Sort note based on user preferences
        user.noteSorting === "alpha-desc" && sortNotesAlphabetical("desc") // Sort note based on user preferences
      } else {
        console.error('Erreur lors de la récupération des notes', data.error);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des notes', err.message);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        backendUrl + `/notes/favorites/${user.token}`
      );

      const data = await response.json();

      if (data.result) {
        setFavoris(data.favorites);
      } else {
        console.error(
          'Erreur lors de la récupération des favoris',
          data.error
        );
      }
    } catch (err) {
      console.error(
        'Erreur lors de la récupération des favoris',
        err.message
      );
    }
  };

  const sortNotesAlphabetical = (order) => {
    setTitleNotes((prev) => [...prev].sort((a, b) =>{
      // if order != "asc" => switch to descending order
      const o = order === "asc" ? a : b
      const p = order === "asc" ? b : a
      return o.title.localeCompare(p.title)
    }));
  }

  // FETCH FAVORITE NOTE TITLE WITH USER TOKEN
  useEffect(() => {
    fetchFavorites();
  }, [isFavorite, currentNote, modifTitle]);

  // FETCH NOTE TITLE WITH USER TOKEN
  useEffect(() => {
    fetchNotes();
  }, [currentNote, modifTitle, user]);




  const popoverContentStyle = "flex w-full focus:outline-none text-darkPurple hover:bg-darkPurple hover:text-white rounded-sm pt-0.5 pb-1 px-2 mt-2 hover:cursor-pointer"
  const popoverContent = (
      <div className="">
        <div 
          className={popoverContentStyle} 
          onClick={() => dispatch(updateNoteSortingInStore("alpha-asc"))}>A 🠒 Z</div>
        <div 
          className={popoverContentStyle} 
          onClick={() => dispatch(updateNoteSortingInStore("alpha-desc"))}>Z 🠒 A</div>
      </div>
  );


  const container = 'h-full w-64 bg-backgroundColor flex flex-col';
  const headerContainer = 'flex justify-start pl-4';
  const btnHideSidebarleft = 'pt-4 text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out';
  const logoContainer = 'flex justify-center';
  const logoImage ='w-20 h-20 m-4';
  const bookmarkFavorisContainer = 'border-b-2 border-solid border-gray pl-4 pb-4';
  const bookmarkContainer = 'flex items-center justify-normal ml-10';
  const iconBookmark = 'text-darkPurple';
  const favorisStyle = 'items-center text-darkPurple mt-0 mb-0 ml-2 font-bold';
  const newNoteFavoris = 'ml-12 overflow-y-auto max-h-[150px] mr-2';
  const addPlusFilterContainer = 'flex justify-around';
  const iconAddFolder = 'p-4 text-darkPurple text-base hover:text-lightPurple transition duration-300 ease-in-out';
  const iconAddNewNote = 'p-4 text-darkPurple text-base hover:text-lightPurple transition duration-300 ease-in-out';
  const iconFilter = 'p-4 text-darkPurple text-base hover:text-lightPurple transition duration-300 ease-in-out';
  const noteTitleContainer = 'flex-1 overflow-y-auto pl-4 mr-2';

  return (
    <div className={container}>
      {/* HEADER SIDEBAR */}
      <div className={headerContainer}>
        <button className={btnHideSidebarleft}>
          <TbLayoutSidebarLeftCollapseFilled
            size={24}
            onClick={toggleSidebarLeft}
          />
        </button>
      </div>
      <div className={logoContainer}>
        <img src='logofinal.png' alt='logo' className={logoImage}></img>
      </div>

      {/* FAVORIS */}
      {selectFavoris.length > 0 && (<div className={bookmarkFavorisContainer}>
        <div className={bookmarkContainer}>
          <FontAwesomeIcon icon={faBookmark} className={iconBookmark} />
          <p className={favorisStyle}>
            Favoris
          </p>
        </div>
        <div className={newNoteFavoris}>
          {selectFavoris.map((favoris, i) => (
            <NoteLink key={i} title={favoris.title} noteId={favoris.id} />
          ))}
        </div>
      </div>)}

      {/* ICONS ADD AND SORT */}
      <div className={addPlusFilterContainer}>
        {/* <button>
          <FontAwesomeIcon
            icon={faFolderPlus}
            className={iconAddFolder}
          />
        </button> */}
        <button>
          <FontAwesomeIcon
            icon={faFileCirclePlus}
            className={iconAddNewNote}
            onClick={() => createNote()}
          />
        </button>
        <Popover placement="right" title="Ordre des notes" content={popoverContent} trigger="hover">
          <button>
            <FontAwesomeIcon
              icon={faSort}
              className={iconFilter}
            />
          </button>
        </Popover>
      </div>

      {/* NOTES TITLE */}
      <div className={noteTitleContainer}>
        {titleNotes.map((note, i) => (
          <NoteLink
            key={i}
            title={note.title}
            noteId={note.id}
            isCurrent={currentNote === note.id}
            stylePage='sidebar'
          />
        ))}
      </div>

      {/* Utilisation du comaposant ConnectedUser*/}

      <ConnectedUser />
    </div>
  );
}
