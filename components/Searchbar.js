import { useState } from 'react';
import NoteLink from '../components/NoteLink'
import styles from '../styles/Search.module.css'
import Image from 'next/image';
import { useSelector, useDispatch } from "react-redux"
import { replaceCurrentNote } from '../reducers/currentNote';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Searchbar() {
      const [search, setSearch] = useState('')
      const [dataNote, setDataNote] = useState([])
      const [tag, setTag] = useState([])

      const user = useSelector(state => state.user.value)
      const dispatch = useDispatch()
  
      const handleSubmit = () => {
        console.log(search);
      }
      
      const changeInput = (inputValue) => {
        //si dans valeur de l'input il existe le caractere "#"
        if(inputValue.includes('#')){
          const tabStringInput = inputValue.split(" ") //On crée un tableau a partir de la chaine de caractere avec le separeteur " "
          const tabTag = tabStringInput.filter(el => el.startsWith('#')) // On filtre que les element qui commence par "#"
          setTag(tabTag) // on et a jour l'etat
        }
        setSearch(inputValue) 

        fetch(`http://localhost:3000/search/${inputValue}`)
        .then(response => response.json())
        .then(data => {
            setDataNote(data) 
		});
        
      };
  
      let notes= dataNote.map((note,i) =>{
            return <NoteLink key={i} title={note.title}/>
      })
  
      //creation liste HASTAG
      let tags= tag.map((hastag,i) =>{
        return <p key={i} className='border-4 border-black text-gray-900'>{hastag}</p>
      })

    const createNote = async() => {
      const token = user.token
      const response = await fetch(`${backendUrl}/notes/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await response.json()
      // console.log(data)
      data.result && dispatch(replaceCurrentNote(data.note._id))
    }
  
    return (
        <div className='text-gray-900 flex flex-row justify-center justify-items-center bg-backgroundColor'>
        <Image 
                src="/../public/assets/icon_new_note.png"
                width={50} 
                height={50}
                alt="icon of filter"
                className="cursor-pointer"
                onClick={() => createNote()}
        />

        <div className=''>
          <input onChange={(e) => changeInput(e.target.value)}  value={search} className='border-4 border-black text-gray-900'/>
          <button onClick={() => handleSubmit()}>
            <Image 
                src="/../public/assets/icon_search.png"
                width={50} 
                height={50}
                alt="icon of filter"
            />
          </button>
          <button onClick={() => handleSubmit()}>
            <Image 
                src="/../public/assets/icon_filter.png"
                width={50} 
                height={50}
                alt="icon of filter"
            />
          </button>
        
        </div>
          <div>{tags}</div>
          <div>{notes}</div>

      </div>
    );
  
}
