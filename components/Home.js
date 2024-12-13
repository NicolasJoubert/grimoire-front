import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { replaceCurrentNote } from '../reducers/currentNote';

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
  // const [isNoteVisible, setIsNoteVisible] = useState(true)

  const user = useSelector((state) => state.user.value);
  const noteId = useSelector((state) => state.currentNote.value);
  const dispatch = useDispatch();

  const toggleSidebarLeft = () => {
    setIsSidebarLeftVisible(!isSidebarLeftVisible);
  };

  const toggleSidebarRight = () => {
    setIsSidebarRightVisible(!isSidebarRightVisible);
  };

  const router = useRouter();

  // REDIRECTION UTILISATEUR SI NON SIGNE SUR LE PAGE DE CONNEXION
  useEffect(() => {
    if (!user || !user.token) {
      router.push('/');
    }
  }, [user, router]);

  const createNote = async () => {
    const token = user.token;
    const response = await fetch(`${backendUrl}/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    data.result && dispatch(replaceCurrentNote(data.note._id));
  };

  return (
    <div className='text-white flex flex-row space-x h-screen p-0 m-0'>
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

/*
    <div className="bg-red-500 flex flex-row">
            <div className="basis-1/5 bg-red-500"></div>
            <div className="basis-11/20 bg-blue-500"></div>
            <div className="basis-1/4 bg-blue-500"></div>
    </div>
*/
