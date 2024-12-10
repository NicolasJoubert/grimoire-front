import { useState, useEffect } from 'react';
import NoteLink from './NoteLink.js';
// REDUCER
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';

import { useRouter } from 'next/router';

//ICONES FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function SidebarLeft({ toggleSidebarLeft, createNote }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [selectFavoris, setFavoris] = useState('');
  const [notes, setNotes] = useState([]);

  const router = useRouter();

  // REDUCER
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const currentNote = useSelector((state) => state.currentNote.value);

  const favoris = ['Note 1', 'Note 2'];

  // FETCH NOTE TITLE WITH USER TOKEN
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(backendUrl + `/notes/user/${user.token}`);

        const data = await response.json();
        console.log(data);

        if (data.result) {
          setNotes(data.notes);
        } else {
          console.error('Erreur lors de la récupération des notes', data.error);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des notes', err.message);
      }
    };
    fetchNotes();
  }, [currentNote]);

  // FONCTION TO DISCONNECT USERS
  const handleLogout = () => {
    router.push('/');
    dispatch(logout());
  };

  return (
    <div className='h-full w-64 bg-backgroundColor flex flex-col'>
      {/* HEADER SIDEBAR */}
      <div className='flex justify-end'>
        <button>
          <img
            src='show_sidebar_icon.png'
            alt='showSideBar'
            className='p-4'
          ></img>
        </button>
      </div>
      <div className='flex justify-center'>
        <img src='logofinal.png' alt='logo' className='w-20 h-20 m-4'></img>
      </div>

      {/* FAVORIS */}
      <div className='border-b-2 border-solid border-gray pl-4 pb-4'>
        <div className='flex items-center justify-normal ml-10'>
          <img src='bookmark-solid.png'></img>
          <p className='items-center text-darkPurple m-2 font-bold'>Favoris</p>
        </div>
        <div className='ml-16'>
          {favoris.map((favoris, index) => (
            <p
              key={index}
              onClick={() => setFavoris(favoris)}
              className='text-grey mb-0 cursor-pointer hover:underline'
            >
              {favoris}
            </p>
          ))}
        </div>
      </div>

      {/* ICONES ADD AND FILTER */}
      <div className='flex justify-around'>
        <button>
          <img src='folder.png' alt='showSideBar' className='p-4'></img>
        </button>
        <button>
          <img
            src='addNoteSideBar.png'
            alt='showSideBar'
            className='p-4'
            onClick={() => createNote()}
          ></img>
        </button>
        <button>
          <img src='filter.png' alt='showSideBar' className='p-4'></img>
        </button>
      </div>

      {/* NOTES TITLE */}
      <div className='flex-1 overflow-y-auto'>
        {notes.map((note, i) => (
          <NoteLink key={i} title={note.title} noteId={note.id} />
        ))}
      </div>

      {/* FOOTER SIDEBAR */}
      <div className='flex justify-between items-center p-4 border-t border-gray-300'>
        <div className='flex items-center'>
          <img
            src='hat-wizard-solid.png'
            className='rounded-full bg-white'
          ></img>
          <p className='text-xs text-black mb-0 ml-2'>{user.username}</p>
        </div>
        <div className='flex justify-normal items-center'>
          <img src='moon-solid.png' className='mr-2'></img>
          <button>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className='text-darkPurple'
              onClick={handleLogout}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
