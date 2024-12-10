import { useState, useEffect } from 'react';
import NoteLink from './NoteLink.js';
import { useSelector } from 'react-redux';

export default function SidebarLeft({ toggleSidebarLeft, createNote }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [selectFavoris, setFavoris] = useState('');
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState('');

  const user = useSelector((state) => state.user.value);

  const favoris = ['Note 1', 'Note 2'];

  // FETCH NOTE TITLE
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
  }, []);

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
        <NoteLink notes={notes} />
      </div>

      {/* FOOTER SIDEBAR */}
      <div className='flex justify-between items-center p-4 border-t border-gray-300'>
        <div className='flex items-center'>
          <img
            src='hat-wizard-solid.png'
            className='rounded-full bg-white'
          ></img>
          <p className='text-xs text-black mb-0 ml-2'>Benji le magicien</p>
        </div>
        <img src='moon-solid.png' className='mr-6'></img>
      </div>
    </div>
  );
}
