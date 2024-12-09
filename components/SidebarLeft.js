import { useState } from 'react';
import NoteLink from './NoteLink.js';

export default function SidebarLeft({toggleSidebarLeft, createNote}) {
  const [selectFavoris, setFavoris] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  const favoris = ['Note 1', 'Note 2'];

  const notes = [
    'Note 1',
    'Note 2',
    'Note 3',
    'Note 4',
    'Note 5',
    'Note 6',
    'Note 7',
  ];

  return (
    <div className='h-full w-64 bg-backgroundColor h-full'>
      <div className='flex justify-end'>
        <button>
          <img
            src='show_sidebar_icon.png'
            alt='showSideBar'
            className='p-4  '
          ></img>
        </button>
      </div>
      <div className='flex justify-center'>
        <img src='logofinal.png' alt='logo' className='w-20 h-20 m-4'></img>
      </div>
      <div className='border-b-2 border-solid border-gray p-4'>
        <div className='flex items-center justify-normal ml-10'>
          <img src='bookmark-solid.png'></img>
          <p className='items-center text-darkPurple m-2 font-bold'>Favoris</p>
        </div>
        <div className='ml-16'>
          {favoris.map((favoris, index) => (
            <p
              key={index}
              onClick={() => setFavoris(favoris)}
              className='text-grey mb-0  cursor-pointer hover:underline'
            >
              {favoris}
            </p>
          ))}
        </div>
      </div>
      <div className='flex justify-around'>
        <button>
          <img src='folder.png' alt='showSideBar' className='p-4'></img>
        </button>
        <button>
          <img
            src='addNoteSideBar.png'
            alt='showSideBar'
            className='p-4  '
            onClick={() => createNote()}
          ></img>
        </button>
        <button>
          <img src='filter.png' alt='showSideBar' className='p-4  '></img>
        </button>
      </div>
      <div className='border-b-2 border-solid border-gray p-4'>
        {notes.map((note, index) => (
          <p
            key={index}
            onClick={() => setSelectedNote(note)}
            className='text-xs text-black ml-9 cursor-pointer hover:underline'
          >
            {note}
          </p>
        ))}
      </div>
      <div className='flex justify-between items-center mt-4'>
        <div className='flex items-center ml-4'>
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
