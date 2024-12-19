import moment from 'moment';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCurrentNote, updateTitleNote } from '../reducers/currentNote.js';
import { toggleFavorite } from '../reducers/changeStatus.js';
import Tag from './Tag';
import TextBloc from './Blocs/TextBloc';
import CodeBloc from './Blocs/CodeBloc';
import InternalLinkBloc from './Blocs/InternalLinkBloc.js';
import NoteLink from './NoteLink.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Note() {
  const [noteData, setNoteData] = useState({});
  const [blocCount, setBlocCount] = useState(1);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [tagCount, setTagCount] = useState(1);
  const [isTagInputVisible, setIsTagInputVisible] = useState(false);
  const [isSearchInternalModalOpen, setIsSearchInternalModalOpen] = useState(false);
  const [titleForwardNotes, setTitleForwardNotes] = useState([]);
  const [titleBackwaardNotes, setTitleBackwardNotes] = useState([]);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.value.token);
  const defaultDevLanguage = useSelector(
    (state) => state.user.value.defaultDevLanguage
  );
  const noteId = useSelector((state) => state.currentNote.value);

  // ************ ALL FUNCTIONS *************

  /** Retrieve note from database */
  const fetchNote = async () => {
    try {
      const response = await fetch(`${backendUrl}/notes/${noteId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const createdAt = new Date(data.not e.createdAt)
      const data = await response.json();
      if (data.result) {
        setNoteData({
          title: data.note.title,
          createdAt: moment(data.note.createdAt).format('DD/MM/YYYY'),
          updatedAt: moment(data.note.updatedAt).format('DD/MM/YYYY'),
          blocs: data.note.blocs.sort((a, b) => a.position - b.position), // sort bloc in increasing order of position
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

  /** Save note when title is changed and update updatedAt  */
  const saveNote = async () => {
    // IMPORTANT : do not save blocs, only updated last modified and title
    try {
      const response = await fetch(`${backendUrl}/notes/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId, noteData }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /** delete note in database and remove it from store */
  const deleteNote = async () => {
    try {
      const response = await fetch(`${backendUrl}/notes/delete/${noteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.result) {
        console.log('Note deleted successfully');
        dispatch(removeCurrentNote());
      } else {
        console.error('Error deleting note:', data.error);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  /** Add a bloc below the one which created it */
  const addBloc = async (position, type, noteId) => {
    console.log('click');
    // Get blocs in the note that have a position superior to the one creating it
    const response = await fetch(`${backendUrl}/blocs/${noteId}/${position}`);
    const data = await response.json();
    const blocsIds = data.blocs.map((bloc) => bloc._id);

    if (data.result) {
      // if there are blocs below the new one, we increment their position
      if (blocsIds.length > 0) {
        const response = await fetch(`${backendUrl}/blocs/increment`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ blocsIds }),
        });
        await response.json();
      }

      // After potential below blocs were displaced, we create the new bloc
      const newBlocPosition = position + 1; // new bloc has a position superior by one to the precedent
      // First we get defaultLanguage id
      const responseLang = await fetch(
        `${backendUrl}/dev/languages/type/display/value/${defaultDevLanguage.displayValue.replace(' ', '_')}`
      );
      const dataLang = await responseLang.json();

      const response = await fetch(`${backendUrl}/blocs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position: newBlocPosition,
          type,
          noteId,
          language: dataLang.language._id,
        }),
      });
      const data = await response.json();
      // update bloc count (used to fetch note)
      data.result && setBlocCount((blocCount += 1));
      if (data.result && type === "internal link") {
        setIsSearchInternalModalOpen(true)
      }
    }
  };

  const deleteBloc = async (blocId) => {
    // delete bloc ONLY if there are more than 1 bloc
    if (blocCount > 1) {
      const response = await fetch(`${backendUrl}/blocs/${blocId}/${noteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      data.result && setBlocCount((blocCount -= 1));
    }
  };

  /** Change title value in noteData state when changed */
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setNoteData((prevData) => ({
      ...prevData, // Copy all other properties
      title: newTitle, // Update only the title
    }));
    dispatch(updateTitleNote(newTitle));
  };

  /** Update note favorite status */
  const addRemoveFavorite = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/notes/addfavorites/${noteId}`,
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

  /** Get tags from database */
  const fetchTags = () => {
    fetch(`${backendUrl}/tags/` + noteId)
      .then((r) => r.json())
      .then((d) => setTags(d.tags))
      .catch((e) => console.error(e.message));
  };

  /** Manage keyboard interactions for tags */
  const handleTagKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsTagInputVisible(false);
      addTag();
    }
  };

  /** Show tag input  */
  const displayTagInput = () => {
    setIsTagInputVisible(!isTagInputVisible);
  };

  /** Create tag in database and fetch tags  */
  const addTag = async () => {
    try {
      const response = await fetch(`${backendUrl}/tags/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: tagInput,
          token: userId,
          noteId: noteId,
        }),
      });
      const result = await response.json();
      if (result) {
        setTagInput(''); // Réinitialise le champ tag
        setIsTagInputVisible(false); // Masque le champ input
        setTagCount((tagCount += 1));
        fetchTags();
      } else {
        console.error('Error adding tag: ', result.error);
      }
    } catch (error) {
      console.error('Error add tag', error);
    }
  };

  /** Delete tag in database and fetch tags  */
  const deleteTag = async (value) => {
    try {
      console.log('click');
      const response = await fetch(`${backendUrl}/tags/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: userId,
          noteId,
          value,
        }),
      });
      const data = await response.json();
      data.result && setTagCount((tagCount -= 1));
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  // ************ ALL USE EFFECTS *************

  /** Fetch note in database based on ID in currentNote reducer
   * Automatically add a bloc on creation
   */
  useEffect(() => {
    fetchNote();
  }, [noteId, blocCount, isSearchInternalModalOpen]);

  /** Updates note in database when noteData is changed */
  useEffect(() => {
    saveNote();
  }, [noteData, blocCount]); // Adding blocsCount allow to update lastmodified when bloc is added or deleted

  /** Fetch tag when currentNote is changed */
  useEffect(() => {
    fetchTags();
  }, [noteId, tagCount]);


  // ***************   BLOCS RENDERER   ***********************

  const renderedBlocs = noteData?.blocs?.map((bloc, i) => {
    let blocComponent = null;

    if (bloc.type === 'text') {
      blocComponent = (
        <TextBloc
          blocId={bloc._id}
          noteId={noteId}
          type={bloc.type}
          content={bloc.content}
          position={bloc.position}
          height={bloc.height}
          addBloc={addBloc}
          deleteBloc={deleteBloc}
          // switchBlocs={(e) => switchBlocs(e, i)}
          // setBlocsValue={setBlocsValue}
        />
      );
    } else if (bloc.type === 'code') {
      blocComponent = (
        <CodeBloc
          blocId={bloc._id}
          noteId={noteId}
          type={bloc.type}
          language={bloc.language}
          position={bloc.position}
          lineCount={bloc.lineCount}
          content={bloc.content}
          addBloc={addBloc}
          deleteBloc={deleteBloc}
          // setBlocsValue={setBlocsValue}
        />)
    } else if (bloc.type === "internal link") {
      blocComponent =  <InternalLinkBloc 
                            blocId={bloc._id}
                            noteId={noteId}
                            type={bloc.type}
                            content={bloc.content}
                            position={bloc.position}
                            height={bloc.height}
                            addBloc={addBloc}
                            deleteBloc={deleteBloc}
                            isSearchInternalModalOpen={isSearchInternalModalOpen}
                            setIsSearchInternalModalOpen={setIsSearchInternalModalOpen}
                        />
    }

    return <div key={bloc._id}>{blocComponent}</div>;
  });

  // ***************   STYLE MANAGEMENT   ***********************

  const container =
    'flex flex-1 flex-col flex-start bg-whitePure shadow-xl shadow-lightPurple p-3 rounded-lg pl-4 text-black w-auto max-h-[87%] mr-4 ml-4';
  const topContainer = 'flex justify-between items-center w-full h-12';
  const title = 'text-2xl font-bold';
  const icons =
    'p-4 text-lightPurple text-base hover:text-darkPurple transition duration-300 ease-in-out';
  const metadataContainer =
    'flex flex-row justify-between items-center w-full h-12 text-sm pr-4';
  const tagsContainer = 'flex justify-start items-center';
  const buttonTag =
    'text-xs hover:text-darkPurple hover:bg-lightPurple transition duration-300 ease-in-out bg-darkPurple text-whitePure font-bold p-1 pl-2 pr-2 rounded';
  const inputTag =
    'border-b-2 border-gray-300 focus:border-darkPurple focus:outline-none w-full w-[100px] mr-4 text-center';
  const dates = 'flex flex-col justify-center items-end';
  const blocsContainer =
    'flex-1 flex-col justify-start items start py-3 overflow-y-auto max-h-[60vh] mb-2';
  const blocksLinkedContainer = clsx( 'flex flex-row h-[15%]', titleBackwaardNotes.length > 0 ? 'justify-between':'justify-end');
  const blocksBackwardNotesContainer =
    'w-[50%] p-1 mr-2 pl-2 rounded border-solid shadow-md shadow-lightPurple bg-backgroundColor';
  const blocksForwardNotesContainer =
    'w-[50%] p-1 ml-2 pr-2 rounded border-solid shadow-md shadow-lightPurple bg-backgroundColor text-right';
  const titleLinkedNote = ' text-xs font-bold text-black shadow-2xl';

  // ***************   NOTE DISPLAY  ***********************

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
          {tags.map((t) => (
            <Tag key={t._id} deleteTag={deleteTag}>
              {t.value}
            </Tag>
          ))}
          {isTagInputVisible && (
            <div className='flex items-center'>
              <input
                type='text'
                placeholder='Nouveau tag'
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                value={tagInput}
                className={inputTag}
              />
              {/* <button onClick={addTag} className="p-2 bg-darkPurple text-white rounded">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </button> */}
            </div>
          )}
          <button className={buttonTag} onClick={displayTagInput}>
            + Tag
          </button>
        </div>
        <div className={dates}>
          <span>Créée le {noteData.createdAt}</span>
          <span>Modifiée le {noteData.updatedAt}</span>
        </div>
      </div>
      <div className={blocsContainer}>{renderedBlocs}</div>
      <div className={blocksLinkedContainer}>
        {titleBackwaardNotes.length > 0 && (<div className={blocksBackwardNotesContainer}>
          <h3 className={titleLinkedNote}>Notes liées :</h3>
          {noteData?.backwardNotes?.map((note, i) => (
            <NoteLink
              key={i}
              title={note.title}
              noteId={note.id}
              stylePage='forwardTitle'
            />
          ))}
        </div>)}
        {titleForwardNotes.length > 0 && (<div className={blocksForwardNotesContainer}>
          <h3 className={titleLinkedNote}>Notes reférencées :</h3>
          {noteData?.forwardNotes?.map((note, i) => (
            <NoteLink
              key={i}
              title={note.title}
              noteId={note._id}
              stylePage='forwardTitle'
            />
          ))}
        </div>)}
      </div>
    </div>
  );
}
