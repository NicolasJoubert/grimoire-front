import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCurrentNote,
  replaceCurrentNote,
  updateTitleNote,
} from '../reducers/currentNote.js';
import { toggleFavorite } from '../reducers/changeStatus.js';
import Tag from './Tag';
import TextBloc from './Blocs/TextBloc';
import CodeBloc from './Blocs/CodeBloc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faTrashCan,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Note() {
  const [noteData, setNoteData] = useState({});
  const [blocCount, setBlocCount] = useState(0);
  const dispatch = useDispatch();

  const currentNote = useSelector((state) => state.currentNote.value);

  const fetchNote = async () => {
    try {
      const response = await fetch(`${backendUrl}/notes/${currentNote}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const createdAt = new Date(data.note.createdAt)
      const data = await response.json();
      if (data.result) {
        setNoteData({
          title: data.note.title,
          createdAt: moment(data.note.createdAt).format('DD/MM/YYYY'),
          updatedAt: moment(data.note.updatedAt).format('DD/MM/YYYY'),
          blocs: data.note.blocs,
          forwardNotes: data.note.forwardNotes,
          backwardNotes: data.note.backwardNotes,
          isBookmarded: data.note.isBookmarked,
          isPrivate: data.note.isPrivate,
          //user => on l'inclue ?
        });
        setBlocCount(data.note.blocs.length);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveNote = async () => {
    // IMPORTANT : do not save blocs, only updated last modified and title
    try {
      const response = await fetch(`${backendUrl}/notes/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId: currentNote, noteData }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.result) {
        // for now, only log success
        console.log(`Note ${currentNote} saved in database`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /** Fetch note in database based on ID in currentNote reducer
   * Automatically had a bloc on creation
   */
  useEffect(() => {
    if (blocCount === 0 && noteData?.blocs?.length === 0) {
      // controls that no bloc exists in note
      addBloc('text', currentNote);
      fetchNote();
    } else {
      fetchNote();
    }
  }, [currentNote, blocCount]);

  /** Updates note in database when noteData is changed */
  useEffect(() => {
    saveNote();
  }, [noteData, blocCount]); // Adding blocsCount allow to update lastmodified when bloc is added or deleted

  /** Change title value in noteData state when changed */
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setNoteData((prevData) => ({
      ...prevData, // Copy all other properties
      title: newTitle, // Update only the title
    }));
    dispatch(updateTitleNote(newTitle));
  };

  const addBloc = async (type, noteId) => {
    // create new bloc and update noteData blocs array
    const response = await fetch(`${backendUrl}/blocs/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, noteId }),
    });
    const data = await response.json();
    data.result && setBlocCount((blocCount += 1));
  };

  const deleteBloc = async (blocId) => {
    // delete bloc ONLY if there are more than 1 bloc
    if (blocCount > 1) {
      const response = await fetch(
        `${backendUrl}/blocs/${blocId}/${currentNote}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await response.json();
      data.result && setBlocCount((blocCount -= 1));
    }
  };

  const blocRefs = useRef([]);

  const switchBlocs = (e, index) => {
    if (e.key === 'ArrowDown') {
      if (index < blocCount - 1) {
        blocRefs.current[index + 1].commands.focus();
      }
    } else if (e.key === 'ArrowUp') {
      if (index > 0) {
        blocRefs.current[index - 1].commands.focus();
      }
    }
  };

  const renderedBlocs = noteData?.blocs?.map((bloc, i) => {
    let blocComponent = null;

    if (bloc.type === 'text') {
      blocComponent = (
        <TextBloc
          blocId={bloc._id}
          noteId={currentNote}
          type={bloc.type}
          position={i + 1}
          blocRef={(bloc) => (blocRefs.current[i] = bloc)}
          content={bloc.content}
          addBloc={addBloc}
          deleteBloc={deleteBloc}
          switchBlocs={(e) => switchBlocs(e, i)}
          // setBlocsValue={setBlocsValue}
        />
      );
    } else if (bloc.type === 'code') {
      blocComponent = (
        <CodeBloc
          blocId={bloc._id}
          noteId={currentNote}
          type={bloc.type}
          language='javascript'
          content={bloc.content}
          addBloc={addBloc}
          deleteBloc={deleteBloc}
          // setBlocsValue={setBlocsValue}
        />
      );
    }

    return <div key={bloc._id}>{blocComponent}</div>;
  });

  const deleteNote = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/notes/delete/${currentNote}`,
        { method: 'DELETE' }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.result) {
        console.log('Note deleted successfully');
        dispatch(deleteCurrentNote());
      } else {
        console.error('Error deleting note:', data.error);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const addRemoveFavorite = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/notes/addfavorites/${currentNote}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data.result) {
        // Met à jour en localement la note pour afficher de manière dynamique l'icone bookmark active non active
        setNoteData((prevData) => ({
          // extrait les propriétés de noteDataet inverse isBookmarked
          ...prevData,
          isBookmarded: !prevData.isBookmarded,
        }));
        // Mets à jour Redux pour déclencher useEffect dans Sidebar
        dispatch(toggleFavorite());
      } else {
        console.error('Error deleting note:', data.error);
      }
    } catch (error) {
      console.error('Error add or Remove favorite note', error);
    }
  };

  //tag
  const [tag, setTag] = useState('');
  const [showModal, setShowModal] = useState('false');

  const addTag = async () => {
    try {
      const response = await fetch(`${backendUrl}/tag/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag }),
      });
    } catch (error) {
      console.error('Error add tag', error);
    }
  };

  const container =
    'flex flex-1 flex-col flex-start border-solid border border-black p-3 rounded-lg text-black';
  const topContainer = 'flex justify-between items-center w-full h-12';
  const title = 'text-2xl font-bold';
  const icons =
    'p-4 text-lightPurple text-base hover:text-darkPurple transition duration-300 ease-in-out';
  const metadataContainer =
    'flex flex-row justify-between items-center w-full h-12';
  const tagsContainer = 'flex justify-start';
  const dates = 'flex flex-col justify-center items-end';
  const blocsContainer = 'flex-1 flex-col justify-start items start py-3';

  return (
    <div className={container}>
      <div className={topContainer}>
        <input
          className={title}
          type='text'
          value={noteData.title}
          onChange={(e) => handleTitleChange(e)}
        />
        <div>
          <button>
            <FontAwesomeIcon
              icon={faBookmark}
              className={
                noteData.isBookmarded
                  ? 'p-4 text-darkPurple text-base hover:text-lightPurple transition duration-300 ease-in-out'
                  : 'p-4 text-lightPurple text-base hover:text-darkPurple transition duration-300 ease-in-out'
              }
              onClick={addRemoveFavorite}
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faTrashCan}
              className={icons}
              onClick={deleteNote}
            />
          </button>
        </div>
      </div>
      <div className={metadataContainer}>
        <div className={tagsContainer}>
          <Tag>bdd</Tag>
          <Tag>méthode</Tag>
          <button>
            <FontAwesomeIcon icon={faCirclePlus} className={icons} />
          </button>
        </div>
        <div className={dates}>
          <span>Créée le {noteData.createdAt}</span>
          <span>Modifiée le {noteData.updatedAt}</span>
        </div>
      </div>
      <div className={blocsContainer}>{renderedBlocs}</div>
    </div>
  );
}
