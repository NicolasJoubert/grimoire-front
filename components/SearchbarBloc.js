import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCirclePlus,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SearchbarBloc() {
  const [search, setSearch] = useState('');
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const token = useSelector((state) => state.user.value.token);
  const noteId = useSelector((state) => state.currentNote.value);



  //Input value gestion
  const changeInput = (inputValue) => {
    if (inputValue === '') {
      setSearch('');
      setSearchedNotes([]);
      setIsSearchResultVisible(false);
      return;
    }
   
    setSearch(inputValue);

    fetch(`${backendUrl}/notes/search/${inputValue}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchedNotes(data);
        if (data.length > 0) {
          setIsSearchResultVisible(true);
        }
      });
  };

  const addReferenceNote = async(refNoteId)=>{
    const response = fetch(`${backendUrl}/blocs/referenceLink`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentNoteId: noteId, refNoteId: refNoteId }),
    })
   
  }

  //noteLink creation liste
  let notes = [];
  if (searchedNotes.length > 0) {
    notes = searchedNotes.map((note, i) => {
      return (
        <button
          onClick={() => setIsSearchResultVisible(false)}
          className='text-left'
        >
          <button key={i} title={note.title} noteId={note._id} className='text-black' onClick={()=> addReferenceNote(note._id)}>{note.title}</button>
        </button>
      );
      }
    );
  }

  return (
    <div className='text-gray-900 flex flex-row justify-between items-center bg-backgroundColor sticky top-0 py-4 w-full '>
    

      {/* Search */}
      <div className='flex flex-1 justify-center'>
        <div className='flex border-b-2 border-darkPurple w-[80%]'>
          <input
            onChange={(e) => changeInput(e.target.value)}
            value={search}
            className='text-lg text-gray-900 w-full focus:outline-none bg-backgroundColor'
            placeholder='Search'
          />
         
            {/* <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='p-4 text-darkPurple text-xl hover:text-lightPurple transition duration-300 ease-in-out'
            />
           */}
        </div>
      </div>

      {/* Résultats de la recherche */}
      {isSearchResultVisible && (
        <div className='absolute top-20 left-0 w-full max-w-screen-sm flex flex-col justify-center items-center z-40'>
          <div className='w-full flex flex-col bg-lightPurple rounded-lg p-4'>
            {searchedNotes && notes}
          </div>
        </div>
      )}
    </div>
  );
}
