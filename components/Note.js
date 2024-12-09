import 'antd/dist/antd.css';
import { Popover, Button } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import Tag from './Tag';
import TextBloc from './Blocs/TextBloc';
import CodeBloc from './Blocs/CodeBloc';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const Note = () => {
    const [noteData, setNoteData] = useState({})
    const [titleInput, setTitleInput] = useState(noteData.title)
    const [blocs, setBlocs] = useState([])

    const noteId = useSelector(state => state.currentNote.value)

    useEffect(() => {
        /** Fetch note in database based on ID in currentNote reducer */
        (async () => {
            try {
                const response = await fetch(`${backendUrl}/notes/${noteId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // const createdAt = new Date(data.note.createdAt)
                const data = await response.json();
                if (data.result) {
                    setNoteData({
                    // title: data.note.title,
                    createdAt: moment(data.note.createdAt).format('DD-MM-YYYY'),
                    updatedAt: moment(data.note.updatedAt).format('DD-MM-YYYY'),
                    content: data.note.content,
                    forwardNotes: data.note.forwardNotes,
                    backwardNotes: data.note.backwardNotes,
                    isBookmarded: data.note.isBookmarked,
                    isPrivate: data.note.isPrivate
                    //user => on l'inclue ?
                    })
                    setTitleInput(data.note.title)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, [noteId])
    
    const addBlock = () => {
        setBlocs((prevBlocs) => [
            ...prevBlocs,
            { id: prevBlocs.length,
                value: "",
                type: "text",
                langage: null,
            }, // assign a unique id to each block
        ]);
    };
    
    const deleteBlock = (id) => {
        console.log(id)
        setBlocs(blocs.filter(bloc => bloc.id != id))
    };
    
    const setBlocValue = (blocId, value) => {
        const updatedBlocs = blocs.map(bloc => bloc.id == blocId ? { ...bloc, value } : bloc)
        setBlocs(updatedBlocs)
    }
    
    const setBlocType = (blocId, type) => {
        const updatedBlocs = blocs.map(bloc => bloc.id == blocId ? { ...bloc, type } : bloc)
        setBlocs(updatedBlocs)
    }

    const renderedBlocs = blocs.map((bloc, i) => {
        let blocComponent =  <TextBloc 
          id={i}
          value={bloc.value}
          setBlocValue={setBlocValue}/>

          return (
              <div key={i} className="bg-red-500">
              <button onClick={(i, type) => setBlocType(bloc.id, "text")} className="">Text</button>
              {blocComponent}
          </div>
      )})

    const container = "flex flex-1 flex-col flex-start border-solid border border-black p-3 rounded-lg text-black"
    const topContainer = "flex justify-between items-center w-full h-12"
    const title="text-2xl"
    const icons=""
    const metadataContainer = "flex flex-row justify-between items-center w-full h-12"
    const tagsContainer = "flex justify-start"
    const dates = "flex flex-col justify-center items-end"
    const blocsContainer = ""

    const createdAt = moment(noteData.createdAt).format('DD-MM-YYYY');
        
    return (
        <div className={container}>
            <div className={topContainer}>
                <input 
                    className={title}
                    type="text"
                    value={titleInput}
                    onChange={e => setTitleInput(e.target.value)} />
                <div className={icons}>ICONS</div>
            </div>
            <div className={metadataContainer}>
                <div className={tagsContainer}>
                    <Tag>bdd</Tag>
                    <Tag>méthode</Tag>
                </div>
                <div className={dates}>
                    <span>Créée le {createdAt}</span>
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