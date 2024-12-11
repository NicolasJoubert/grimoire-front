import 'antd/dist/antd.css';
import { Popover, Button } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import Tag from './Tag';
import TextBloc from './Blocs/TextBloc';
import CodeBloc from './Blocs/CodeBloc';
import { createTextBloc } from '../modules/blocsFormatter';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const Note = () => {
    const [noteData, setNoteData] = useState({})
    const [blocsLength, setBlocsLength] = useState(0)

    const currentNote = useSelector(state => state.currentNote.value)

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
                    isPrivate: data.note.isPrivate
                    //user => on l'inclue ?
                });
                console.log("bloc data", noteData.blocs)
                setBlocsLength(data.note.blocs.length)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const saveNote = async () => {
        // IMPORTANT : do not save blocs, only updated last modified and title
        try {
            const response = await fetch(`${backendUrl}/notes/`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ noteId: currentNote, noteData })
              });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.result) {
                // for now, only log success
                console.log(`Note ${currentNote} saved in database`)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    /** Fetch note in database based on ID in currentNote reducer */
    useEffect(() => {
        // fetchNote();
        (blocsLength === 0) && addBloc("text") // console.log("blocs length => ", noteData?.blocs?.length)
        console.log("nouvelle note", noteData)
        fetchNote();
    }, [currentNote])

    // /** Fetch note in database based on ID in currentNote reducer */
    // useEffect(() => {
    //     (noteData.blocs?.length === 0) && addBloc("text") // console.log("blocs length => ", noteData?.blocs?.length)
    // }, [])

    /** Updates note in database when noteData is changed */
    useEffect(() => {
        saveNote()
    }, [noteData, blocsLength])

    /** Update blocs position when number of blocs are changed*/
    // useEffect(() => {
    //     const blocs = noteData?.blocs?.map((data, i) => {
    //         return { 
    //             ...data, 
    //             position: i
    //         }
    //     })
    //     // update noteData with updated blocs positions
    //     setNoteData((prevData) => ({
    //         ...prevData,
    //         blocs,
    //     }));
    // }, [blocsLength])

    /** Change title value in noteData state when changed */
    const handleTitleChange = (event) => {
        setNoteData((prevData) => ({
          ...prevData, // Copy all other properties
          title: event.target.value, // Update only the title
        }));
    };

    const addBloc = async (type) => {
        // create new bloc and update noteData blocs array
        console.log("jauoute un bloc")
        const response = await fetch(`${backendUrl}/blocs/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, noteId: currentNote }),
        });
        const data = await response.json();
        // data.result && console.log("bloc ajouté")
        data.result && fetchNote()
        setBlocsLength(blocsLength += 1)

        // const newBloc = createTextBloc(noteData, "text")
        // const blocs = noteData.blocs
        // blocs.push(newBloc)

        // update noteData with updated blocs
        // setNoteData((prevData) => ({
        //     ...prevData,
        //     blocs,
        // }));

    };
    
    const deleteBloc = (id) => {
        console.log("id: ", id)
        
        // delete bloc ONLY if there are more than 1 bloc
        if (blocsLength > 1) { 
            // Deleting a bloc means filtering current notedData blocs with blocs whose position is different than the function argument
            const updatedBlocs = noteData.blocs.filter(data => data.id != id)
            setNoteData((prevData) => ({
                ...prevData,
                blocs: updatedBlocs,
            }));
            setBlocsLength(updatedBlocs.length)
        }
    };
    
    const setBlocsValue = (id, value) => {
        const updatedBlocs = noteData.blocs.map(data => data.id == id ? { ...data, value } : data)
        setNoteData((prevData) => ({
            ...prevData,
            blocs: updatedBlocs,
        }));
    }
    
    const setBlocsType = (blocPosition, type) => {
        const updatedBlocs = noteData.blocs.map(data => data.position == blocPosition ? { ...data, type } : data)
        setNoteData((prevData) => ({
            ...prevData,
            blocs: updatedBlocs,
        }));
    }

    const renderedBlocs = noteData?.blocs?.map((bloc, i) => {
        let blocComponent =  <TextBloc 
            id={bloc._id}
            position={i}
            value={bloc.value}
            addBloc={addBloc}
            deleteBloc={deleteBloc}
            setBlocsValue={setBlocsValue}/>

          return (
            <div key={bloc.id}>{blocComponent}</div>
        //       <div key={i} className="bg-blue-500">
        //       <button onClick={(i, type) => setBlocsType(bloc.position, "text")} className="">Text</button>
        //       {blocComponent}
        //   </div>
      )})

    const container = "flex flex-1 flex-col flex-start border-solid border border-black p-3 rounded-lg text-black"
    const topContainer = "flex justify-between items-center w-full h-12"
    const title="text-2xl font-bold"
    const icons=""
    const metadataContainer = "flex flex-row justify-between items-center w-full h-12"
    const tagsContainer = "flex justify-start"
    const dates = "flex flex-col justify-center items-end"
    const blocsContainer = "flex-1 flex-col justify-start items start py-3"

    return (
        <div className={container}>
            <div className={topContainer}>
                <input 
                    className={title}
                    type="text"
                    value={noteData.title}
                    onChange={e => handleTitleChange(e)} />
                <div className={icons}>ICONS</div>
            </div>
            <div className={metadataContainer}>
                <div className={tagsContainer}>
                    <Tag>bdd</Tag>
                    <Tag>méthode</Tag>
                </div>
                <div className={dates}>
                    <span>Créée le {noteData.createdAt}</span>
                    <span>Modifiée le {noteData.updatedAt}</span>
                </div>
            </div>
            <div className={blocsContainer}>
                {renderedBlocs}
            </div>
        </div>
    )
}

export default Note