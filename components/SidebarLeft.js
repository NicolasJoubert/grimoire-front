import { useState, useEffect } from 'react';
import NoteLink from './NoteLink.js';
// REDUCER
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

//ICONES FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faFolderPlus,
  faFileCirclePlus,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';

import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';

// Import du composant FooterSideBar
import ConnectedUser from './ConnectedUser.js';

export default function SidebarLeft({ toggleSidebarLeft, createNote }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [selectFavoris, setFavoris] = useState([]);
  const [titleNotes, setTitleNote] = useState([]);

  const router = useRouter();

  // REDUCER
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const currentNote = useSelector((state) => state.currentNote.value);
  const isFavorite = useSelector((state) => state.changeStatus.value);
  const modifTitle = useSelector((state) => state.currentNote.title);

  // FETCH FAVORITE NOTE TITLE WITH USER TOKEN
  useEffect(() => {
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
    fetchFavorites();
  }, [isFavorite, currentNote, modifTitle]);

  // FETCH NOTE TITLE WITH USER TOKEN
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(backendUrl + `/notes/user/${user.token}`);

        const data = await response.json();
        console.log(data);

        if (data.result) {
          setTitleNote(data.notes);
        } else {
          console.error('Erreur lors de la récupération des notes', data.error);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des notes', err.message);
      }
    };
    fetchNotes();
  }, [currentNote, modifTitle]);





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
      <div className={bookmarkFavorisContainer}>
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
      </div>

      {/* ICONES ADD AND FILTER */}
      <div className={addPlusFilterContainer}>
        <button>
          <FontAwesomeIcon
            icon={faFolderPlus}
            className={iconAddFolder}
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faFileCirclePlus}
            className={iconAddNewNote}
            onClick={() => createNote()}
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faFilter}
            className={iconFilter}
          />
        </button>
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
