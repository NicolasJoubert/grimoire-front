import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { replaceCurrentNote, removeCurrentNote } from '../reducers/currentNote';

import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Searchbar from './Searchbar';
import Note from './Note';
import Placeholder from './Placeholder';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [isSidebarLeftVisible, setIsSidebarLeftVisible] = useState(true);
  const [isSidebarRightVisible, setIsSidebarRightVisible] = useState(true);

  const user = useSelector((state) => state.user.value);
  const noteId = useSelector((state) => state.currentNote.value);

  const dispatch = useDispatch();
  const router = useRouter();

  const toggleSidebarLeft = () => {
    setIsSidebarLeftVisible(!isSidebarLeftVisible);
  };

  const toggleSidebarRight = () => {
    setIsSidebarRightVisible(!isSidebarRightVisible);
  };

  const createNote = async () => {
    /** Create note and add a single bloc to it */
    const token = user.token;
    // Create note
    const response = await fetch(`${backendUrl}/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    const noteId = data.note._id;
    if (data.result) {
      // Place note in store
      dispatch(replaceCurrentNote(noteId));
      // Create a text bloc at position 0
      const response = await fetch(`${backendUrl}/blocs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: 0, type: 'text', noteId }),
      });
      await response.json();
    }
  };


  // REDIRECTION UTILISATEUR SI NON SIGNE SUR LE PAGE DE CONNEXION
  useEffect(() => {
    if (!user || !user.token) {
      router.push('/');
    }
    return (() => dispatch(removeCurrentNote()))
  }, [user, router]);


  return (
    <div className='text-white flex flex-row space-x h-[100vh] w-screen p-0 m-0'>
      {isSidebarLeftVisible && (
        <SidebarLeft
          toggleSidebarLeft={toggleSidebarLeft}
          createNote={createNote}
        />
      )}
      <div className='h-full flex-1 flex flex-col'>
        <Searchbar
          createNote={createNote}
          toggleSidebarLeft={toggleSidebarLeft}
          isSidebarLeftVisible={isSidebarLeftVisible}
          toggleSidebarRight={toggleSidebarRight}
          isSidebarRightVisible={isSidebarRightVisible}
          onOutsideClick={false}  //Gestion Click Exterieur searchBar
        />
        {noteId ? <Note /> : <Placeholder />}
      </div>
      {isSidebarRightVisible && (
        <SidebarRight
          toggleSidebarRight={toggleSidebarRight}
          createNote={createNote}
        />
      )}
    </div>
  );
}
