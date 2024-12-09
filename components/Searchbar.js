import { useState } from 'react';
import NoteLink from '../components/NoteLink'
import styles from '../styles/Search.module.css'
import Image from 'next/image';


export default function Searchbar() {

    const [showModal, setShowModal] = useState(false);


    const allNote = [

        {
          "_id": "note_1",
          "title": "First Note",
          "createdAt": "2024-11-05T10:00:00Z",
          "updatedAt": "2024-11-06T11:00:00Z",
          "content": "This is the content of the first note.",
          "forwardNotes": ["note_2"],
          "backwardNotes": [],
          "isBookmarked": true,
          "isPrivate": false,
          "user": "user_1"
        },
        {
          "_id": "note_2",
          "title": "Second Note",
          "createdAt": "2024-11-06T12:00:00Z",
          "updatedAt": "2024-11-07T13:00:00Z",
          "content": "Content of the second note.",
          "forwardNotes": ["note_3"],
          "backwardNotes": ["note_1"],
          "isBookmarked": false,
          "isPrivate": false,
          "user": "user_1"
        },
        {
          "_id": "note_3",
          "title": "Third Note",
          "createdAt": "2024-11-08T14:00:00Z",
          "updatedAt": "2024-11-09T15:00:00Z",
          "content": "This is the third note.",
          "forwardNotes": [],
          "backwardNotes": ["note_2"],
          "isBookmarked": true,
          "isPrivate": true,
          "user": "user_1"
        },
        {
          "_id": "note_4",
          "title": "Fourth Note",
          "createdAt": "2024-11-10T16:00:00Z",
          "updatedAt": "2024-11-11T17:00:00Z",
          "content": "Fourth note content.",
          "forwardNotes": ["note_5"],
          "backwardNotes": [],
          "isBookmarked": false,
          "isPrivate": true,
          "user": "user_1"
        },
        {
          "_id": "note_5",
          "title": "Fifth Note",
          "createdAt": "2024-11-12T18:00:00Z",
          "updatedAt": "2024-11-13T19:00:00Z",
          "content": "This is the content of the fifth note.",
          "forwardNotes": [],
          "backwardNotes": ["note_4"],
          "isBookmarked": false,
          "isPrivate": false,
          "user": "user_1"
        },
        {
          "_id": "note_6",
          "title": "Sixth Note",
          "createdAt": "2024-11-14T20:00:00Z",
          "updatedAt": "2024-11-15T21:00:00Z",
          "content": "Sixth note content.",
          "forwardNotes": ["note_7"],
          "backwardNotes": [],
          "isBookmarked": true,
          "isPrivate": true,
          "user": "user_1"
        },
        {
          "_id": "note_7",
          "title": "Seventh Note",
          "createdAt": "2024-11-16T22:00:00Z",
          "updatedAt": "2024-11-17T23:00:00Z",
          "content": "This is the seventh note.",
          "forwardNotes": [],
          "backwardNotes": ["note_6"],
          "isBookmarked": false,
          "isPrivate": false,
          "user": "user_1"
        },
        {
          "_id": "note_8",
          "title": "Eighth Note",
          "createdAt": "2024-11-18T00:00:00Z",
          "updatedAt": "2024-11-19T01:00:00Z",
          "content": "Eighth note content.",
          "forwardNotes": ["note_9"],
          "backwardNotes": [],
          "isBookmarked": true,
          "isPrivate": true,
          "user": "user_1"
        },
        {
          "_id": "note_9",
          "title": "Ninth Note",
          "createdAt": "2024-11-20T02:00:00Z",
          "updatedAt": "2024-11-21T03:00:00Z",
          "content": "This is the ninth note.",
          "forwardNotes": [],
          "backwardNotes": ["note_8"],
          "isBookmarked": false,
          "isPrivate": false,
          "user": "user_1"
        },
        {
          "_id": "note_10",
          "title": "Tenth Note",
          "createdAt": "2024-11-22T04:00:00Z",
          "updatedAt": "2024-11-23T05:00:00Z",
          "content": "Tenth note content.",
          "forwardNotes": [],
          "backwardNotes": [],
          "isBookmarked": true,
          "isPrivate": true,
          "user": "user_10"
        }
      
      ]
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
        // const notesFilter = allNote.filter(el => el.title.toLowerCase().startsWith(inputValue.toLowerCase()))
        // setDataNote(notesFilter)  
      };
  
      let notes= dataNote.map((note,i) =>{
            return <NoteLink key={i} title={note.title}/>
      })
  
      //creation liste HASTAG
      let tags= tag.map((hastag,i) =>{
        return <p key={i} className='border-4 border-black text-gray-900'>{hastag}</p>
      })
  
    return (
      <div>
        <div className='border-4 border-black text-gray-900'>
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
          {notes}

      </div>
    );
  
}
