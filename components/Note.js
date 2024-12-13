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
import { faBookmark, faTrashCan, faCirclePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Note() {
  const [noteData, setNoteData] = useState({});
  const [blocCount, setBlocCount] = useState(1);
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
      await response.json();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /** Fetch note in database based on ID in currentNote reducer
   * Automatically had a bloc on creation
   */
  useEffect(() => {
      fetchNote();
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

  /** Add a bloc below the one which created it */
  const addBloc = async (position, type, noteId) => {

    // Get blocs in the note that have a position superior to the one creating it
    const response = await fetch(`${backendUrl}/blocs/${noteId}/${position}`)
    const data = await response.json()
    const blocsIds = data.blocs.map(bloc => bloc._id)

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
      const newBlocPosition = position + 1 // new bloc has a position superior by one to the precedent
      const response = await fetch(`${backendUrl}/blocs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: newBlocPosition, type, noteId }),
      });
      const data = await response.json();
      // update bloc count (used to fetch note)
      data.result && setBlocCount((blocCount += 1))
    }
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

  // const switchBlocs = (e, index) => {
  //   if (e.key === 'ArrowDown') {
  //     if (index < blocCount - 1) {
  //       blocRefs.current[index + 1].commands.focus();
  //     }
  //   } else if (e.key === 'ArrowUp') {
  //     if (index > 0) {
  //       blocRefs.current[index - 1].commands.focus();
  //     }
  //   }
  // };

  const renderedBlocs = noteData?.blocs?.map((bloc, i) => {
    let blocComponent = null;

      if (bloc.type === "text") {
        blocComponent =  <TextBloc 
                              blocId={bloc._id}
                              noteId={currentNote}
                              type={bloc.type}
                              content={bloc.content}
                              position={bloc.position}
                              height={bloc.height}
                              addBloc={addBloc}
                              deleteBloc={deleteBloc}
                              // switchBlocs={(e) => switchBlocs(e, i)}
          // setBlocsValue={setBlocsValue}
                          />
      } else if (bloc.type === "code") {
        blocComponent =  <CodeBloc 
                              blocId={bloc._id}
                              noteId={currentNote}
                              type={bloc.type}
                              language="javascript"
                              position={bloc.position}
                              lineCount={bloc.lineCount}
                              content={bloc.content}
                              addBloc={addBloc}
                              deleteBloc={deleteBloc}
          // setBlocsValue={setBlocsValue}
        />
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
  const tagDur= ["JavaScript", "Python", "Go", "CSS","TypeScript", "C#"]
    const [tag, setTag] = useState("")
    const [isTagInputVisible, setIsTagInputVisible] = useState("false")
    const [tags, setTags] = useState([])
    const userId = useSelector((state) => state.user.value.token);
    const noteId = useSelector((state) => state.currentNote.value)

    const fetchTags = () => {
        fetch(`${backendUrl}/tags/` + noteId)
            .then((r) => r.json())
            .then((d) => setTags(d.tags))
            .catch((e) => console.error(e.message))
    }

    useEffect(() => {
        fetchTags()
    }, [noteId])
    
    const addTag = async () => {
            try {  
            const response = await fetch(
                `${backendUrl}/tags/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', }, 
                    body: JSON.stringify({
                        value: tag,
                        token: userId,
                        noteId: noteId,
                     }),  
                  
                })
            const result = await response.json()
             if (result) {
                setTag(""); // Réinitialise le champ tag
                setIsTagInputVisible(false); // Masque le champ input
                fetchTags()
            } else {
                
                console.error('Error adding tag: ', result.error);
            }
        } catch (error) {
            console.error('Error add tag', error);
       }} 
       
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setIsTagInputVisible(false)
            addTag()
        }

    }
    const inputVis = () => {
        setIsTagInputVisible(!isTagInputVisible)
    }        
    
  const container =
    'flex flex-1 flex-col flex-start border-solid border border-black p-3 rounded-lg text-black';
  const topContainer = 'flex justify-between items-center w-full h-12';
  const title = 'text-2xl font-bold';
  const icons =
    'p-4 text-lightPurple text-base hover:text-darkPurple transition duration-300 ease-in-out';
  const metadataContainer =
    'flex flex-row justify-between items-center w-full h-12';
  const tagsContainer = 'flex justify-start items-center';
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
            {tags.map((t) => <Tag key={t._id}>{t.value}</Tag>)}
              {isTagInputVisible && (
                <div className="flex items-center">
                  <input
                    type='text'
                    placeholder='Ajoute un tag bro'
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={tag}
                    className="border p-2 rounded mr-2 "
                  />
                  {/* <button onClick={addTag} className="p-2 bg-darkPurple text-white rounded">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </button> */}
                </div>
              )}
          <button>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={icons}
              onClick={inputVis}
            />
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
