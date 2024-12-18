import clsx from 'clsx';
import { Popover } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import NoteLink from '../NoteLink';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const InternalLinkBloc = ({ 
    blocId,
    noteId,
    type,
    content,
    position,
    height, 
    deleteBloc,
    addBloc
}) => {
    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchedNotes, setSearchedNotes] = useState([]);
    const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
    const [internalLinkId, setInternalLinkId] = useState('')
    const [internalLinkTitle, setInternalLinkTitle] = useState('')
    const token = useSelector((state) => state.user.value.token);
    
    const [isBlocHovered, setIsBlocHovered] = useState(false);   
   
    useEffect(() => {
        let contentTab = content.split("     ");
        if (contentTab.length > 0) {
            setInternalLinkId(contentTab[0]);
            setInternalLinkTitle(contentTab[1]);
        }
    }, [content]); 

    /** Save Bloc in database */
    const saveBloc = async (idRef, titleRef) => {
        try {
            content = `${idRef}     ${titleRef}`
            const response = await fetch(`${backendUrl}/blocs/save`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blocId, type, content })
              });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.result) {
                // for now, only log success
                console.log(`Bloc ${blocId} saved in database`)
                // NEED TO MANAGE NOTE UPDATEDAT HERE (new route put ?)
                console.log(`le type ${content} et le content ${content}saved in database`)
                let contentTab = content.split("     ")
                setInternalLinkId(contentTab[0])
                setInternalLinkTitle(contentTab[1])
                console.log('contentTab',contentTab[0])
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
                
    const popoverContentStyle = "flex w-full focus:outline-none text-darkPurple hover:bg-darkPurple hover:text-white rounded-sm pt-0.5 pb-1 px-2 mt-2 hover:cursor-pointer"
    const popoverContent = (
        <div className="">
          <div className={popoverContentStyle} onClick={() => addBloc(position, "text", noteId)}>Texte</div>
          <div className={popoverContentStyle} onClick={() => addBloc(position, "code", noteId)}>Code</div>
          <div className={popoverContentStyle} onClick={() => addBlocActiveModal()}>Internal link</div>
        </div>
    );

    const addBlocActiveModal = ()=>{
        addBloc(position, "internal link", noteId)
        setIsModalOpen(true)
    }

    const container = clsx("flex justify-between items-start")
    const buttonStyle = clsx(
        isBlocHovered ? "bg-lightPurple" : "bg-transparent",
        "rounded-full w-6 h-6 text-center cursor-pointer text-white hover:bg-darkPurple hover:opacity-100 transition-opacity duration-200")
    const inputStyle = clsx("w-full ml-2.5 text-black")// border-solid border border-black rounded-md 


    

    const handleCancel = () => {
    setIsModalOpen(false);
    };
  
    //Input value gestion
    const changeInput = (inputValue) => {
      if (inputValue === '') {
        setSearch('');
        setSearchedNotes([]);
        setIsSearchResultVisible(false);
        return;
      }
     
      setSearch(inputValue);
  
      fetch(`${backendUrl}/notes/search/${inputValue}/${token}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchedNotes(data);
          if (data.length > 0) {
            setIsSearchResultVisible(true);
          }
        });
    };
  
    // add id refenced note to BDD and link inside note
    const addReferenceNote = async(refNoteId, refNoteIdTitle)=>{
        //add id refenced note to BDD 
      const response = await fetch(`${backendUrl}/blocs/referenceLink`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentNoteId: noteId, refNoteId: refNoteId }),
      })

      // Addlink inside note
      setIsModalOpen(false);
    //   setInternalLinkId(refNoteId.toString())
    //   setInternalLinkTitle(refNoteIdTitle)
      saveBloc(refNoteId.toString(), refNoteIdTitle)
      
    }
  
    //noteLink creation liste
    let notes = [];
    if (searchedNotes.length > 0) {
      notes = searchedNotes.map((note, i) => {
        return (
          <button
            onClick={() => setIsSearchResultVisible(false)}
            className='text-left'
          >
            <button key={i} title={note.title} noteId={note._id} className='text-black' onClick={()=> addReferenceNote(note._id, note.title)}>{note.title}</button>
          </button>
        );
        }
      );
    }
     
    return (
        <div 
            className={container}
            onMouseEnter={() => setIsBlocHovered(true)}
            onMouseLeave={() => setIsBlocHovered(false)}>
            <Popover title="Type de bloc" content={popoverContent} trigger="hover">
                <div 
                    className={buttonStyle}
                    onClick={() => addBloc(position, type, noteId)}>+</div>
            </Popover>

             <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div className='text-gray-900 flex flex-col justify-between items-center bg-backgroundColor w-full '>
                    {/* Search */}
                    <div className='w-[80%]'>
                        <input
                        onChange={(e) => changeInput(e.target.value)}
                        value={search}
                        className='text-lg text-gray-900 w-full focus:outline-none bg-backgroundColor p-2'
                        placeholder='Lien vers une note'
                        />
                    </div>
                    {/* Résultats de la recherche */}
                    {isSearchResultVisible && (
                    <div className='w-full max-w-screen-sm flex flex-col justify-center items-center'>
                        <div className='w-full flex flex-col bg-lightPurple rounded-lg p-4 my-4'>
                        {searchedNotes && notes}
                        </div>
                    </div>
                    )}
                </div>
            </Modal>
            <div className='flex flex-row justify-start items-center w-full'>
                {internalLinkId !== '' && (<NoteLink title={internalLinkTitle} noteId={internalLinkId} />) }
            </div>
        </div>
    )
}

export default InternalLinkBloc