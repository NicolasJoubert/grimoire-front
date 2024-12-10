import { useState } from 'react';
import NoteLink from './NoteLink'
import styles from '../styles/Search.module.css'
import Image from 'next/image';


export default function Searchbar({ createNote }) {

      const [search, setSearch] = useState('')
      const [dataNote, setDataNote] = useState([])
      const [tag, setTag] = useState([])
  
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
  
    return (
      <>
        <div className='text-gray-900 flex flex-row justify-around justify-items-center bg-backgroundColor sticky top-0'>
          
          <button onClick={() => createNote()} className='h-10'>
            <Image 
                    src="/assets/icon_new_note.png"
                    width={35} 
                    height={35}
                    alt="icon of filter"     
            />
          </button>

          <div className='flex justify-end justify-items-end border-b-2 border-darkPurple w-96 block h-10'>
            <input onChange={(e) => changeInput(e.target.value)}  value={search} className='border-black text-gray-900 w-full focus:outline-none bg-backgroundColor'/>
            <button onClick={() => handleSubmit()}>
              <Image 
                  src="/assets/icon_search.png"
                  width={25} 
                  height={25}
                  alt="icon of filter"
              />
            </button>
          </div>

          <button onClick={() => handleSubmit()} className='h-10'>
            <Image 
                src="/assets/icon_filter.png"
                width={30} 
                height={30}
                alt="icon of filter"
            />
          </button>

        </div>

          <div>{tags}</div>
          <div>{notes}</div>
      </>
    );
  
}

